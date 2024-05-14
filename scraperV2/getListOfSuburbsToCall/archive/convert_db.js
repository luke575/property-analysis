const fs = require('fs');

let data = fs.readFileSync('./rawsuburbs.json', "utf8");

data = JSON.parse(data)

let count = 0;
let output = `INSERT INTO suburbs (id, suburb, state) VALUES`


const convertedData = {};
data.data.forEach(item => {
  if(['NSW', 'VIC', 'QLD'].includes(item.state) && item.population > 2000 && item.type === 'Major Urban locality') {
    convertedData[item.ssc_code] = item;
    output += ` (${item.ssc_code}, '${item.suburb}', '${item.state}'), \n`
    count++
  }
});

// IMPORTANT - THE LAST CHARACTER IS WRONG IN THE OUTPUT
// IMPORTANT - THE LAST CHARACTER IS WRONG IN THE OUTPUT
// IMPORTANT - THE LAST CHARACTER IS WRONG IN THE OUTPUT
// IMPORTANT - THE LAST CHARACTER IS WRONG IN THE OUTPUT
// IMPORTANT - THE LAST CHARACTER IS WRONG IN THE OUTPUT
// IMPORTANT - THE LAST CHARACTER IS WRONG IN THE OUTPUT
// IMPORTANT - THE LAST CHARACTER IS WRONG IN THE OUTPUT
output += `;`
console.log('count', count)
fs.writeFileSync(`suburbs.json`, output, { flag: 'wx', encoding: 'utf8'});