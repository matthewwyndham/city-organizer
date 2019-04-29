const {
    read,
    write,
    prettyprint
} = require('./utils')
const { performance } = require('perf_hooks');

const fs = require('fs');
const d3v = require('d3-dsv');
const path = require('path');

/******************/
/* defualt values */
/******************/
var t0, t1, csvData, regions;
var filename = 'cities.csv';
var debug = false;
var countCities = 0;
const regionOrder = ['Pacific', 'Mountain', 'Midwest', 'South', 'Northeast']; // keep track of order of regions (west to east) 

/**********************************/
/* city-csv to region-md reducer! */
/**********************************/
function regionReducer(reg, city) {
    // reg is 'region', meaning the collection of cities organized into groups in states, in regions
    var findRegion = reg.find(e => e.name === city['REGION']);
    // check if region does not exist
    if (findRegion === undefined) {
        // new region object (string:name, array:states)
        reg.push({name: city['REGION'], states: []});
        reg.sort((a,b) => regionOrder.findIndex(e => e === a.name) - regionOrder.findIndex(e => e === b.name)); // sorted by globally defined order

        if (debug) {process.stdout.write("[R]");}

        findRegion = reg.find(e => e.name === city['REGION']);
    }

    // check if state does not exist
    var findStates = findRegion.states.find(e => e.name === city['STATE']);
    if (findStates === undefined) {
        // new state object (string:name, array:cities)
        findRegion.states.push({name: city['STATE'], cities: []});
        findRegion.states.sort((a,b) => a.name.localeCompare(b.name)); // alphabetical by name

        if (debug) {process.stdout.write("S");}

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

/* start of timing */
/*-----------------*/
t0 = performance.now(); // for timing how long this process runs

/**********************************/
/* command line argument handling */
/**********************************/
// command line syntax: second argument will specify file to read
if (process.argv[2] === undefined || !process.argv[2].includes(".csv")) {
    console.log("No file specified, using", filename);
} 
else {
    filename = process.argv[2];
}

// add a third arugment to print debug info (I suggest: ' debug')
if (process.argv[3] !== undefined) {debug = true;}

/*************/
/* read file */
/*************/
console.log("Extracting data from " + filename + " ...");
csvData = d3v.csvParse(fs.readFileSync(filename, 'utf8'));

/**************/
/* parse file */
/**************/
/* convert the csv to a nice format that is easy to print as markdown */
console.log("Creating object that groups cities by state and region ...")
regions = csvData.reduce(regionReducer, []);

if (debug) {console.log("\ntotal cities:", countCities);}

/******************/
/* write new file */
/******************/
// substring to remove '.csv' from the name
console.log("Writing data to regions-" + filename.substring(0, filename.length - 4) + ".md ...");
write('regions-' + filename.substring(0, filename.length - 4) + '.md', regions);

/* end of timing */
/*---------------*/
t1 = performance.now();
console.log(`runtime: ${((t1-t0) / 1000).toPrecision(4)} sec`);