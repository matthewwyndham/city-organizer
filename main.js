const {
    read,
    write,
    prettyprint
} = require('./utils')


// slicing down to just the first couple rows to make your life easier for now
var csvData = read('cities.csv').slice(0, 10)


/* --- Your awesome code here --- */
// debug
console.log(csvData);

// Convert the csv of each city to a nice list organized by
// region, state, then city
var regions = csvData.reduce(regionReducer, new Array());

// each region, state, and city is an object
// (reg = reduced 'region' array, city = current 'city' from csv)
function regionReducer(reg, city) {
    // check if reg is empty

    // check if region does not exist

    // new region object (string:name, array:states)

    // check if state exists

    // new state object (string:name, array:cities)
 
    // new city object (string:name, string:population)
}


// debug
console.log(prettyprint(regions));