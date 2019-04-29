const { write } = require('./utils')

const { performance } = require('perf_hooks');
const fs = require('fs');
const d3v = require('d3-dsv');

/******************/
/* defualt values */
/******************/
var t0, t1, csvData, regions, outFile, prettyString;
var filename = 'cities.csv';
const regionOrder = ['Pacific', 'Mountain', 'Midwest', 'South', 'Northeast']; // keep track of order of regions (west to east) 

/*********************************************/
/* city-csv-style to region-md-style reducer */
/*********************************************/
function regionReducer(reg, city) {
    // reg is 'region', meaning the collection of cities organized into groups in states, in regions
    
    // check if region does not exist
    var findRegion = reg.find(e => e.name === city['REGION']);
    if (findRegion === undefined) {
        // new region object (string:name, array:states)
        reg.push({name: city['REGION'], population: 0, states: []});

        // make sure the state is searching the right region
        findRegion = reg.find(e => e.name === city['REGION']);
    }

    // check if state does not exist
    var findStates = findRegion.states.find(e => e.name === city['STATE']);
    if (findStates === undefined) {
        // new state object (string:name, array:cities)
        findRegion.states.push({name: city['STATE'], population: 0, cities: []});

        // make sure the city is searching the right state and region
        findStates = findRegion.states.find(e => e.name === city['STATE']);
    }

    // check if city does not exist
    var findCity = findStates.cities.find(e => e.name === city['CITY']);
    if (findCity === undefined) {
        // new city object (string:name, string:population)
        findStates.cities.push({name: city['CITY'], population: parseInt(city['POPULATION'])});
    } // ignore duplicate cities (if the region, state, and city name are the same then *IGNORED*);
    
    return reg; // this is an object so this is a reference and not a copy
}

/* Pretty Print: handle each city */
function prettifyCity(prettyString, city) {
    prettyString += "- " + city.name;
    prettyString += " `pop. " + city.population + "`\n";
    return prettyString;
}

/* Pretty Print: handle each state and all sub-cities */
function prettifyState(prettyString, state) {
    prettyString += "## " + state.name;
    prettyString += " `pop. " + state.population + "`\n";
    return state.cities.reduce(prettifyCity, prettyString);
}

/* Pretty Print: handle each region and all sub-states */
function prettifyRegion(prettyString, region) {
    prettyString += "# " + region.name;
    prettyString += " `pop. " + region.population + "`\n";
    prettyString = region.states.reduce(prettifyState, prettyString) + "\n";
    return prettyString;
}

/* BEGIN */
t0 = performance.now(); /* start of timing */

// command line syntax: second argument will specify file to read
if (process.argv[2] !== undefined && process.argv[2].includes(".csv")) {filename = process.argv[2];}

// read file
csvData = d3v.csvParse(fs.readFileSync(filename, 'utf8')).slice(0, 15);

// convert the csv to a nice format that is easy to print as markdown
regions = csvData.reduce(regionReducer, []);

// sorting once after adding everything
regions.sort((a,b) => {
    regionOrder.findIndex(e => e === a.name) - regionOrder.findIndex(e => e === b.name)
});

regions = regions.map(function(e) {    
    e.states.sort((a,b) => a.name.localeCompare(b.name));
    e.states = e.states.map(function (s) {
        s.cities.sort((a,b) => a.population - b.population);
        return s;
    })
    return e;
});

regions = regions.map(r => {
    r.states = r.states.map(s => { // add state population
        s.population = s.cities.reduce((p, c) => p + c.population, 0);
        return s;
    });
    r.population = r.states.reduce((p, s) => p + s.population, 0); // add region population
    return r;
});

// write new file (substring to remove '.csv' from the name)
outFile = 'regions-' + filename.substring(0, filename.length - 4) + '.md';
prettyString = regions.reduce(prettifyRegion, '');
fs.writeFileSync(outFile, prettyString);

t1 = performance.now(); /* end of timing */
console.log(`  (runtime: ${((t1-t0) / 1000).toFixed(5)} sec)`);
