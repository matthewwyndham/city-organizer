const {
    read,
    write,
    prettyprint
} = require('./utils')


// slicing down to just the first couple rows to make your life easier for now
var csvData = read('cities.csv').slice(0, 10)


/* --- Your awesome code here --- */
// debug
// console.log(csvData);

// Convert the csv of each city to a nice list organized by
// region, state, then city
var regions = csvData.reduce(regionReducer, []);

// each region, state, and city is an object
// (reg = reduced 'region' array, city = current 'city' from csv)
function regionReducer(reg, city) {
    var findRegion = reg.find(e => e.name === city['REGION']);
    // check if region does not exist
    if (findRegion === undefined) {
        // new region object (string:name, array:states)
        reg.push({name: city['REGION'], states: []});
        findRegion = reg.find(e => e.name === city['REGION']);
    }

    // check if state does not exist
    var findStates = findRegion.states.find(e => e.name === city['STATE']);
    if (findStates === undefined) {
        // new state object (string:name, array:cities)
        findRegion.states.push({name: city['STATE'], cities: []});
        findStates = findRegion.states.find(e => e.name === city['STATE']);
    }
 
    // check if city does not exist
    var findCity = findStates.cities.find(e => e.name === city['CITY']);
    if (findCity === undefined) {
        // new city object (string:name, string:population)
        findStates.cities.push({name: city['CITY'], population: city['POPULATION']});
    }

    return reg;
}

// write('regions.md', regions);

// debug
console.log("\nData");
console.log('Region', 'State', 'City', 'Population');
for (let r of regions) {
    for (let s of r.states) {
        for (let c of s.cities) {
            console.log(r.name, '\t', s.name, '\t', c.name, '\t', c.population);
        }
    }
}