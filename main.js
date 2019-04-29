const {
    read,
    write,
    prettyprint
} = require('./utils')
const { performance } = require('perf_hooks');
var t0, t1;

t0 = performance.now();

/* I changed this code to allow command line arguments, and to have dynamic filenames */
// command line syntax: specify file to read as second, add a third arugment to print debugs

var filename = 'cities.csv';
var debug = false;

// pass in a filename to process.argv
if (process.argv[2] === undefined || !process.argv[2].includes(".csv")) {
    console.log("No file specified, using 'cities.csv'");
} 
else {
    filename = process.argv[2];
}

// debug mode
if (process.argv[3] !== undefined) {debug = true;}

console.log("Extracting data from " + filename + " ...");
var csvData = read(filename);

/* --- Your awesome code here --- */
// debug
// console.log(csvData);

console.log("Creating object that groups cities by state and region ...")

var countCities = 0;

// keep track of order of regions (west to east)
const regionOrder = ['Pacific', 'Mountain', 'Midwest', 'South', 'Northeast'];

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
        reg.sort((a,b) => regionOrder.findIndex(e => e === a.name) - regionOrder.findIndex(e => e === b.name)); // sorted by defined order

        if (debug) {
            process.stdout.write("[R]");
        }

        findRegion = reg.find(e => e.name === city['REGION']);
    }

    // check if state does not exist
    var findStates = findRegion.states.find(e => e.name === city['STATE']);
    if (findStates === undefined) {
        // new state object (string:name, array:cities)
        findRegion.states.push({name: city['STATE'], cities: []});
        findRegion.states.sort((a,b) => a.name.localeCompare(b.name)); // alphabetical

        if (debug) {
            process.stdout.write("S");
        }

        findStates = findRegion.states.find(e => e.name === city['STATE']);
    }
 
    // check if city does not exist
    var findCity = findStates.cities.find(e => e.name === city['CITY']);
    if (findCity === undefined) {
        // new city object (string:name, string:population)
        findStates.cities.push({name: city['CITY'], population: parseInt(city['POPULATION'])});
        findStates.cities.sort((a,b) => a.population - b.population); // by population

        if (debug) {
            // progress bar (basically)
            process.stdout.write(":");
            countCities = countCities + 1;
        }
    }

    return reg; // this is an object so this is a reference and not a copy
}

if (debug) {
    console.log("\ntotal cities:", countCities);
}

console.log("Writing data to regions-" + filename.substring(0, filename.length - 4) + ".md ...");

// remove '.csv' from the name
write('regions-' + filename.substring(0, filename.length - 4) + '.md', regions);

t1 = performance.now();

if (debug) {
    console.log(`runtime: ${((t1-t0) / 1000).toPrecision(4)} sec`);
}

// debug
// console.log("\nData");
// console.log('Region'.padStart(10), 'State'.padStart(15), 'City'.padStart(20), 'Population'.padStart(15));
// for (let r of regions) {
//     for (let s of r.states) {
//         for (let c of s.cities) {
//             console.log(r.name.padStart(10), s.name.padStart(15), c.name.padStart(20), c.population.toString().padStart(15));
//         }
//     }
// }