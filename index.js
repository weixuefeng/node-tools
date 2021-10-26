
import * as fs from "fs"

const rules = [100, 200, 200, 200, 200, 100]
const startFilePath = "./1-1-1 高山滑雪男子滑降 uri.md"

function main() {
    fs.promises.readFile(startFilePath, { encoding: "utf-8"}).then(
        res => {
            const ipfsArray = res.trim().split("\n")
            if(ipfsArray.length < 1000) {
                console.error("ipfsArray length < 1000")
                return
            }
            let start = 0;
            for(let i = 0; i < rules.length; i++) {
                let length = rules[i]
                let end = start + length
                let data = ipfsArray.slice(start, end)
                console.log(`start:${start}, end:${end}`)
                let dataStr = splitContent(data)
                writeToFile(dataStr, startFilePath + "-" + i)
                start = end
            }
        }
    )
}

function splitContent(content) {
    let res = "["
    for(let i = 0; i < content.length; i++) {
        const item = content[i].trim()
        if(!item.startsWith("ipfs://")) {
            console.error(`content error: ${item}`)
            continue
        }
        res += "\"" + item + "\","
    }
    let result = res.substring(0, res.length - 1) + "]"
    return result
}

function writeToFile(content, fileName) {
    fs.promises.writeFile(fileName, content)
        .then(
            res => {
                console.log(`${fileName} write success`)
            }
        )
}

main()