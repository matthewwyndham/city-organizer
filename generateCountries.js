const fs = require('fs')
const d3 = require('d3-dsv')
const path = require('path')
const assert = require('assert')

const read = name => d3.csvParse(fs.readFileSync(path.join(__dirname,name),'utf-8'))

var regions = {
  Northeast:[ "Connecticut", "Maine", "Massachusetts", "New Hampshire", "Rhode Island", "Vermont", "New Jersey", "New York", "Pennsylvania", ], 
  Midwest:[ "Illinois", "Indiana", "Michigan", "Ohio", "Wisconsin", "Iowa", "Kansas", "Minnesota", "Missouri", "Nebraska", "North Dakota", "South Dakota", ], 
  South:[ "Delaware", "Florida", "Georgia", "Maryland", "North Carolina", "South Carolina", "Virginia", "District of Columbia", "West Virginia", "Alabama", "Kentucky", "Mississippi", "Tennessee", "Arkansas", "Louisiana", "Oklahoma", "Texas", ], 
  Mountain:[ "Arizona", "Colorado", "Idaho", "Montana", "Nevada", "New Mexico", "Utah", "Wyoming", ], 
  Pacific:[ "Alaska", "California", "Hawaii", "Oregon", "Washington", ],
}

regions = Object.entries(regions).reduce((o,[region,states]) => (states.forEach(s => o[s] = region),o),{})

const headers = ['REGION','STATE','CITY','POPULATION']

var acronyms = read('acronyms.csv').reduce((o,r) => (o[r.NAME] = r.INITIAL,o),{})
var cities = read('censusdata.csv').map(r => {
  assert(r.NAME)
  assert(r.STATE)
  assert(r.POPULATION)
  assert(acronyms[r.STATE])
  assert(regions[r.STATE])
  return {
    [headers[0]]: regions[r.STATE],
    [headers[1]]: r.STATE,
    [headers[2]]: r.NAME.replace(/ city$/,'') + ', ' + acronyms[r.STATE],
    [headers[3]]: r.POPULATION
  }
})

fs.writeFileSync('all.csv',d3.csvFormat(cities,headers))
fs.writeFileSync('cities.csv',d3.csvFormat(cities.slice(0,1000),headers))
fs.writeFileSync('nonunique.csv',d3.csvFormat(cities.slice(0,1000).map(r => (r[headers[2]] = r[headers[2]].split(',')[0],r)),headers))