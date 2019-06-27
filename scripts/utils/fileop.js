import path from 'path'
import {DistPath, SourcePath} from '../config'
import fs from 'fs'
import mkdirp from 'mkdirp'

export function getScriptContent (pathname) {
    const content = fs.readFileSync(pathname, {encoding: 'utf-8'})
    return content
}


export async function mkdirpPromise(p) {
    return new Promise((resolve, reject) => {
        mkdirp(p, (err) => {
            !err ? resolve() : reject(err)
        })
    })
}

export async function writeFilePromise (p, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(p, content, function (err) {
            !err ? resolve() : reject(err)
        })
    })
}
export async function saveFile(pathname, content) {
    const _path = path.join(DistPath, pathname)
    const dirPath = path.join(_path, '..')
    await mkdirpPromise(dirPath)
    await writeFilePromise(_path, content)
}