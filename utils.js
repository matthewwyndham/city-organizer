const fs = require('fs')
const path = require('path')
const d3 = require('d3-dsv')
const beautify = require('js-beautify').js

module.exports.read = name => d3.csvParse(fs.readFileSync(path.join(__dirname,name),'utf-8'))
module.exports.write = (name,data) => fs.writeFileSync(path.join(__dirname,name),typeof data =='string' ? data : beautify(JSON.stringify(data)))
module.exports.print = data => console.log(beautify(JSON.stringify(data)))