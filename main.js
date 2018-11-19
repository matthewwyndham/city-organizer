const { read ,write, print } = require('./utils')

/*
  Will read in and parse the csv into an array of objects
  that look like this
  [{ 
      REGION:"Northeast",
      STATE:"New York",
      CITY:"New York, NY",
      POPULATION:"8622698",
  }, ... ]

  We then slice it down to just the first couple of rows
  so that it is easier to debug at first. Feel free to increase
  the limit or run all 1000 rows as you get more confident
*/
var csvData = read('cities.csv').slice(0,10)


/* --- Your awesome code here --- */


print(csvData) // This will console.log with beautify what ever you pass it
write('data.json',csvData) // Writing data to a file can be useful for debugging 