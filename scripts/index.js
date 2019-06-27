import traverse from "@babel/traverse";
import generate from '@babel/generator'
import template from '@babel/template'
// import { transform, transformSync, transformFromAst } from "@babel/core";
import * as t from '@babel/types'
import {createAppjson} from './utils/create-appjson'
import {saveFile, getScriptContent} from './utils/fileop'
import {parseAst} from './utils/parseAst'
import {SourcePath} from './config'
import path from 'path'
import {generatePages} from './mini/generatePages'

function transformApp () {
    const _p = path.join(SourcePath, 'app.js')
    const content = getScriptContent(_p)
    const ast = parseAst(content)
    let appjson = {}
    traverse(ast, {
        ImportDeclaration (astPath) {
            const node = astPath.node
            const source = node.source
            let value = source.value
            if (value === 'react-dom') {
                // astPath.remove()
                
            }
        },
        ClassDeclaration (astPath) {
            const node = astPath.node
            if (node.id && node.id.name == 'App') {
                astPath.replaceWith(t.classDeclaration(t.identifier('_App'), node.superClass, node.body, node.decorators))
            }
        },
        ClassProperty (astPath) {
            const { key: { name }, value } = astPath.node
            if (name === 'pages') {
                appjson.pages = value.elements.map(item => item.value)
                astPath.remove()
            } else if (name === 'config') {
                appjson.window = value.properties.reduce((res, {key, value}) => {
                    res[key.value] = value.value
                    return res
                }, {})
                astPath.remove()
            }
        },
        CallExpression (astPath) {
            // console.log(astPath.node)
            if (t.isCallExpression(astPath.node) && t.identifier('render')) {
                astPath.remove()
            }
        },
        JSXElement (astPath) {
            // console.log(astPath)
        },
        Program: {
            exit (astPath) {
                astPath.node.body.unshift(template(`import {createApp} from './mini'`)())
                astPath.node.body.push(template(`App(createApp(_App))`)())
            }
        }
    })
    createAppjson(appjson)
    appjson.pages.forEach(page => generatePages(page))
    const res = generate(ast).code
    saveFile('app.js', res)
}

transformApp()
