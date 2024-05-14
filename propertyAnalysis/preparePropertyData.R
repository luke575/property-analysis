library(dplyr)

baseDir = "Desktop/PropertyAnalysis/propertyAnalysis/"
inputFile = paste(baseDir, "raw_data/raw_properties.csv", sep="")
outputFile = paste(baseDir, "clean_properties.csv", sep="")

properties <- read.csv(inputFile)

properties <- distinct(properties)

properties$price <- as.numeric(properties$price)
properties$dateSold <- as.Date(properties$dateSold)
properties$beds <- as.numeric(properties$beds)
properties$baths <- as.numeric(properties$baths)
properties$parking <- as.numeric(properties$parking)
properties$landSize <- as.numeric(properties$landSize)
properties$suburb <- tolower(properties$suburb)


properties$yearSold <- format(properties$dateSold, "%Y")
properties$monthSold <- format(properties$dateSold, "%m")

properties <- properties %>% filter(yearSold >= 2005)

write.table(properties, file = outputFile, sep = ",", row.names = FALSE)

print('~~ Done ~~')