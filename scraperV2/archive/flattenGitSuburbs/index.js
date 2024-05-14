const fs = require("fs");

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

let suburbData = JSON.parse(fs.readFileSync(`./suburbs.json`, "utf8"));
const suburbKeys = Object.keys(suburbData)

const newData = [
  [
    "suburb",
    "postcode",
    "state",
    "lat",
    "lng",
  ],
  ...suburbKeys.map((key) => {
    return [
      suburbData[key].suburb,
      suburbData[key].postcode,
      suburbData[key].state,
      suburbData[key].lat,
      suburbData[key].lng,
    ];
  }),
];

fs.writeFileSync("flatSuburbsWithGeoLocation.csv", "");
appendToCSV(newData, "flatSuburbsWithGeoLocation.csv");
