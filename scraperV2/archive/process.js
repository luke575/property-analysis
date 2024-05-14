const fs = require("fs");
const path = require("path");

function importTextFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    return fileContent;
  } catch (error) {
    console.error("Error reading the file:", error);
    return null;
  }
}

let propertyDataFinal = {};

function processFile(filePath) {
  const text = importTextFile(filePath);

  const regex =
    /<script\s+id="__NEXT_DATA__"\s+type="application\/json">\s*({.*?})\s*<\/script>/s;
  const match = text.match(regex);

  if (match && match.length >= 2) {
    const jsonContent = match[1];

    try {
      const jsonObject = JSON.parse(jsonContent);
      const propertyData =
        jsonObject.props.pageProps.componentProps.listingsMap;
      const keys = Object.keys(propertyData);
      keys.forEach((key) => {
        const price = propertyData[key].listingModel.price;
        const dateSold = propertyData[key].listingModel.tags.tagText;
        const address = `${propertyData[key].listingModel.address.street} ${propertyData[key].listingModel.address.suburb}`;

        // propertyDataFinal[address] = propertyDataFinal[address] = {}
        // propertyDataFinal[address][dateSold] = price
        if (propertyDataFinal[address]) {
          propertyDataFinal[address].push([dateSold, price]);
        } else {
          propertyDataFinal[address] = [[dateSold, price]];
        }
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
}

/** */
/** */
const folderPath = "data";
const fileList = []
const files = fs.readdirSync(folderPath);

files.forEach((file) => {
  const filePathX = path.join(folderPath, file);
  const stats = fs.statSync(filePathX);
  if (stats.isFile()) {
    fileList.push(`./data/${file}`);
  }
});
/** */
/** */

fileList.forEach((filePath) => {
  processFile(filePath);
});

const filteredData = Object.fromEntries(
  Object.entries(propertyDataFinal).filter(([, arr]) => arr.length === 2)
);

const sortedData = Object.fromEntries(
  Object.entries(filteredData).sort(([, a], [, b]) => a.length - b.length)
);



function getMonthDiff(d1, d2) {
  var months;
  months = (d2.getFullYear() - d1.getFullYear()) * 12;
  months -= d1.getMonth();
  months += d2.getMonth();
  return months <= 0 ? 0 : months;
}

const monthMap = {
  'Jan': 0,
  'Feb': 1,
  'Mar': 2,
  'Apr': 3,
  'May': 4,
  'Jun': 5,
  'Jul': 6,
  'Aug': 7,
  'Sep': 8,
  'Oct': 9,
  'Nov': 10,
  'Dec': 11,
}

const convertTagToDate = (tag) => {
  const [day,month,year] = tag.slice(-11).split(' ')
  return new Date(year, monthMap[month], day);
}

function cleanPriceString(priceString) {
  const cleanedString = priceString.replace(/[$,]/g, '');
  const numericValue = parseFloat(cleanedString);
  return numericValue;
}

let counter = 0
Object.keys(sortedData).forEach(address => {
  let [firstSaleTag, firstSalePrice] = sortedData[address][0]
  let [secondSaleTag, secondSalePrice] = sortedData[address][1]

  let firstSaleDate = convertTagToDate(firstSaleTag)
  let secondSaleDate = convertTagToDate(secondSaleTag)

  if(firstSaleDate> secondSaleDate) {
    const tempSecondSaleDate = firstSaleDate
    const tempSecondSalePrice = firstSalePrice

    firstSalePrice = secondSalePrice;
    firstSaleDate = secondSaleDate

    secondSalePrice = tempSecondSalePrice
    secondSaleDate = tempSecondSaleDate
  }

  const monthDiff = getMonthDiff(firstSaleDate, secondSaleDate)

  const firstPrice = cleanPriceString(firstSalePrice)
  const secondPrice = cleanPriceString(secondSalePrice)
  const priceDiff = secondPrice - firstPrice

  
  if(firstPrice < 800000 && monthDiff < 18 && monthDiff > 0 && priceDiff > 200000) {
    counter++
    console.log(monthDiff, ` || ${secondPrice} - ${firstPrice} = ${priceDiff} || `, address)
  }
  
})
console.log('Count: ', counter)

// console.log(sortedData);

// console.log(Object.entries(filteredData).length)

/**
 * What do I want to see?
 * - Houses that were bought and sold within an 18 month period
 * - First price was less than 700k
 * - Increase was more than 200k
 * 
 * 
 * - Which suburbs have the most of these? - That will tell us where to look
 * - What improvements were done? This will tell us what to do
 */