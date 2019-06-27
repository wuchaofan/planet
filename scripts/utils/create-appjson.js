import path from 'path'
import {DistPath} from '../config'
import fs from 'fs'
import mkdirp from 'mkdirp'

export function createAppjson (json) {
    const appjson = path.join(DistPath, 'app.json')
    let content = '{}'
    if (fs.existsSync(appjson)) {
        content = fs.readFileSync(appjson, {encoding: 'utf-8'})        
    }
    const _json = {...JSON.parse(content), ...json}

    const res = JSON.stringify(_json,  null, 4)
    mkdirp(DistPath, (err) => {
        if (!err) {
            fs.writeFileSync(appjson, res)
            return
        }
    })

}
