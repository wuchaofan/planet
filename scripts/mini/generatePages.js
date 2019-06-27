import path from 'path'
import {SourcePath} from '../config'
import {getScriptContent, saveFile} from '../utils/fileop'
import traverse from "@babel/traverse";
import {parseAst} from '../utils/parseAst'
import template from '@babel/template'
import generate from '@babel/generator'

export function generatePages(page) {
    const pagePath = path.join(SourcePath, `${page}.js`)
    const content = getScriptContent(pagePath)
    const ast = parseAst(content)
    let componentName;
    traverse(ast, {
        ClassDeclaration (astPath) {
            const node = astPath.node
            if (node.id && node.id.name) {
                componentName = node.id.name
            }
        },
        Program: {
            exit (astPath) {
                astPath.node.body.unshift(template(`import {createPage} from './mini'`)())
                astPath.node.body.push(template(`Page(createPage(${componentName}))`)())
            }
        }
    })
    const res = generate(ast).code
    console.log(res)
    saveFile(`${page}.js`, res)
}