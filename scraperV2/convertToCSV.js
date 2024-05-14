const fs = require("fs");

function removeSingleQuotes(str) {
  return str.replace(/'/g, "").replace(/"/g, "");
}


function convertToYYYYMMDD(utcDateString) {
  const utcDate = new Date(utcDateString);
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function appendToCSV(data, filePath) {
  let csvContent = "";

  // Create the CSV content
  for (const row of data) {
    const rowData = row.map((value) => `"${value}"`).join(",");
    csvContent += rowData + "\n";
  }

  // Append the CSV content to the file
  fs.appendFile(filePath, csvContent, (err) => {
    if (err) {
      console.error("Error appending to CSV file:", err);
    } else {
      console.log("Data has been successfully appended to the CSV file.");
    }
  });
}

function readFilenamesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);
  return files
}
const directoryPath = "data";
const fileNames = readFilenamesInDirectory(directoryPath);


fs.writeFileSync('properties.csv', '');

for (const fileName of fileNames) {
  console.log(fileName)
  let suburbData = JSON.parse(fs.readFileSync(`./data/${fileName}`, "utf8"));

  const newData = [
    ["price", "dateSold", "address", "suburb", "state", "beds", "baths", "parking", "propertyType", "landSize"],
    ...suburbData.map((property) => {
      return [
        property.price,
        convertToYYYYMMDD(property.dateSold),
        removeSingleQuotes(property.address),
        property.suburb,
        property.state,
        property.features.beds,
        property.features.baths,
        property.features.parking,
        property.features.propertyType,
        property.features.landSize,
      ];
    }),
  ];

  appendToCSV(newData, "properties.csv");
}
