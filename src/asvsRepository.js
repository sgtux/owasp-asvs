const fs = require('fs')
const reader = require('read-excel-file/node')

const XLSX_PATH = './Owasp-ASVS-4.0.xlsx'
const JSON_PATH = './asvs.json'

let items = []

if (!fs.existsSync(JSON_PATH)) {
    const x = reader(XLSX_PATH).then(rows => {
        for (let i = 1; i < rows.length; i++) {
            const obj = {}
            rows[0].forEach((prop, j) => obj[prop] = rows[i][j])
            items.push(obj)
            obj.L1 = !!obj.L1
            obj.L2 = !!obj.L2
            obj.L3 = !!obj.L3
        }
        fs.writeFileSync(JSON_PATH, JSON.stringify(items))
    })
} else
    items = JSON.parse(fs.readFileSync(JSON_PATH, { encoding: 'utf-8' }))

const getAll = () => items

const save = item => {
    const itemDb = items.filter(p => p.Item === item.Item)[0]
    if (itemDb) {
        items = items.filter(p => p.Item !== item.Item)
        items.push(item)
    } else
        items.push(item)
    items.sort((a, b) => a.Item > b.Item ? 1 : a.Item < b.Item ? -1 : 0)
    fs.writeFileSync(JSON_PATH, JSON.stringify(items))
}

const remove = key => {
    items = items.filter(p => p.Item !== key)
    fs.writeFileSync(JSON_PATH, JSON.stringify(items))
}

module.exports = {
    getAll,
    save,
    remove
}