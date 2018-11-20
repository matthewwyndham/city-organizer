# City Organizer

You are tasked with reading US Census data which contains the population for a 1000 cities, organizing the data by Region and State, and writing it out to a markdown file. 

In order to get familiar with using Array methods, the only rule is that you are not allowed to use traditional `for` loops. The more you use Array methods like [`.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) and [`.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) instead of [`.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) the better.

There are some provided utility functions to read and parse the csv, to print and write JSON for debugging. But the final writing out to a markdown file is left to the creator for flexability. Here is some suggested code to give you an idea of how it could look like. But will strongly depend on how you have organized your data.

``` js
var file = ""
data.forEach(region => {
  file += `# ${region.name}\n` // Writing the Region Name
  region.states.forEach(state => {
    file += `## ${state.name}\n` // Writing the State Name
    state.cities.forEach(city => {
      // Writing the City name with population
      file += `- ${city.name} ( \`pop. ${city.population.toLocaleString()}\` )\n`
    })
  })
  file += '\n'
})
write('output.md',file)
```

This will create a markdown file `output.md` that will look like what is shown below. Feel free to get creative with the formating to make it more to your liking, but this is the format that will be the one used throughout the doc.
``` md
# Northeast
## New York
- New York, NY ( `pop. 8,622,698` )
```
> # Northeast
> ## New York
> - New York, NY ( `pop. 8,622,698` )

## Getting Started

1. Open the terminal
2. Navigate to your Documents folder then run the following to clone the repository
```
git clone https://github.com/byuitechops/city-organizer.git
cd city-organizer
npm i
```
3. Open the created folder in vscode
4. Install the Markdown Preview plugin in vscode to see how your output will be rendered
5. Write some awesome code
5. Test your code by running `node main.js`

## The Challenge
In `main.js` add the nessesary code to transform the flat csv data into the nested format that is shown below. Where cities of the same STATE are under their respective STATE and states of the same REGION are under their respective REGION

``` md
# Midwest
## Illinois
- Chicago, IL ( `pop. 2,716,450` )

# Mountain
## Arizona
- Phoenix, AZ ( `pop. 1,626,078` )

# Northeast
## New York
- New York, NY ( `pop. 8,622,698` )
## Pennsylvania
- Philadelphia, PA ( `pop. 1,580,863` )

# Pacific
## California
- San Jose, CA ( `pop. 1,035,317` )
- San Diego, CA ( `pop. 1,419,516` )
- Los Angeles, CA ( `pop. 3,999,759` )

# South
## Texas
- Dallas, TX ( `pop. 1,341,075` )
- San Antonio, TX ( `pop. 1,511,946` )
- Houston, TX ( `pop. 2,312,717` )
```

## Further Sorting Challenges
Complete as many as you can

### Sorting States Alphabetically
Either add code or change your existing code so that states under a REGION are sorted alphabetically
``` md
# Pacific
## California
- Oxnard, CA ( `pop. 210,037` )
## Oregon
- Portland, OR ( `pop. 647,805` )
## Washington
- Tacoma, WA ( `pop. 213,418` )
- Spokane, WA ( `pop. 217,108` )
- Seattle, WA ( `pop. 724,745` )

# Mountain
## Colorado
- Aurora, CO ( `pop. 366,623` )
- Colorado Springs, CO ( `pop. 464,474` )
- Denver, CO ( `pop. 704,621` )
## Idaho
- Boise City, ID ( `pop. 226,570` )
## Nevada
- North Las Vegas, NV ( `pop. 242,975` )
- Reno, NV ( `pop. 248,853` )
- Henderson, NV ( `pop. 302,539` )
- Las Vegas, NV ( `pop. 641,676` )
```

### Sorting Cities by Population
Either add code or change your existing code so that cities under a STATE are sorted by their population
``` md
# Pacific
## California
- Los Angeles, CA ( `pop. 3,999,759` )
- San Diego, CA ( `pop. 1,419,516` )
- San Jose, CA ( `pop. 1,035,317` )
- San Francisco, CA ( `pop. 884,363` )
- Fresno, CA ( `pop. 527,438` )
- Sacramento, CA ( `pop. 501,901` )
- Long Beach, CA ( `pop. 469,450` )
- Oakland, CA ( `pop. 425,195` )
- Bakersfield, CA ( `pop. 380,874` )
- Anaheim, CA ( `pop. 352,497` )
- Santa Ana, CA ( `pop. 334,136` )
- Riverside, CA ( `pop. 327,728` )
- Stockton, CA ( `pop. 310,496` )
- Irvine, CA ( `pop. 277,453` )
- Chula Vista, CA ( `pop. 270,471` )
- Fremont, CA ( `pop. 234,962` )
- San Bernardino, CA ( `pop. 216,995` )
- Modesto, CA ( `pop. 214,221` )
- Fontana, CA ( `pop. 211,815` )
- Santa Clarita, CA ( `pop. 210,888` )
- Oxnard, CA ( `pop. 210,037` )
```


### Sort Regions West to East
Either add code or change your existing code so that the regions are in order of West to East. So they follow as `Pacific, Mountain, Midwest, South, Northeast`,

``` md
# Pacific
## California
- Los Angeles, CA ( `pop. 3,999,759` )
- San Diego, CA ( `pop. 1,419,516` )
- San Jose, CA ( `pop. 1,035,317` )

# Mountain
## Arizona
- Phoenix, AZ ( `pop. 1,626,078` )

# Midwest
## Illinois
- Chicago, IL ( `pop. 2,716,450` )

# South
## Texas
- Houston, TX ( `pop. 2,312,717` )
- San Antonio, TX ( `pop. 1,511,946` )
- Dallas, TX ( `pop. 1,341,075` )

# Northeast
## New York
- New York, NY ( `pop. 8,622,698` )
## Pennsylvania
- Philadelphia, PA ( `pop. 1,580,863` )
```
