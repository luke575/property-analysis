baseDir = "Desktop/propertyAnalysis/"

library("ggmap")
library(dplyr)
library(ggplot2)
source(paste(baseDir, "helpers.R", sep=""))



########################## Start config
isLoadPropertyData <- 1

isSplitYearInTwo <- 0

zoomLevel = 12

yearsBetweenStartAndEnd = 2;
yearsToGoBack <- 20 # 20 is what we set to usuallly

mapToUse <- Melbourne

########################## 

if(isLoadPropertyData) {
  propertyFile = paste(baseDir, "clean_properties.csv", sep="")
  suburbGeoFile = paste(baseDir, "suburb_coordinates.csv", sep="")
  
  properties <- read.csv(propertyFile)  
  suburbsWithGeoLocation <- read.csv(suburbGeoFile)
  
  properties$dateSold <- as.Date(properties$dateSold)
  suburbsWithGeoLocation$suburb <- tolower(suburbsWithGeoLocation$suburb)
  
  medianPrice <- properties %>%
    group_by(suburb, monthSold, yearSold) %>%
    summarise(median_price = median(price))
  
  print('~~ Property data read ~~')
}





calculateAndPrint <- function(startYear, endYear, basePath, monthStart, monthEnd) {
  title <- paste(startYear, endYear, monthStart, monthEnd, sep = " - ")
  print(title)

  df_growth <- medianPrice %>%
    filter(yearSold >= startYear & yearSold <= endYear & monthSold >= monthStart & monthSold <= monthEnd) %>%
    group_by(suburb) %>%
    arrange(yearSold, monthSold) %>%
    mutate(priseRise = round((last(median_price) - first(median_price)) / first(median_price) * 100, 1)) %>%
    mutate(dotColor = ifelse(priseRise > 0, "green", "red")) %>%
    mutate(dotSize = getDotSize(priseRise))%>%
    ungroup()
  
  num_records <- nrow(df_growth)
  print(num_records)
  
  
  final <- merge(df_growth, suburbsWithGeoLocation, by = "suburb")
  
  map <- get_stamenmap(mapToUse, zoom = zoomLevel, maptype = "terrain")
  
  
  color_map <- c("red" = "red", "green" = "green")
  
  generatedMap <- ggmap(map) +
    geom_point(data = final, mapping = aes(x = lng, y = lat, color = dotColor, size=dotSize)) +
    
    geom_text(mapping = aes(x = -37.73511, y = 144.7321, label = 'Caroline Springs'), size=1) +
    
    
    scale_color_manual(values = color_map) +
    ggtitle(title)
  
  print(generatedMap)
  
  
  
  
  fileName <- paste(title, "png", sep = ".")
  filePath <- paste(basePath, fileName, sep = "/")
  ggsave(filename = filePath, plot = last_plot(), width = 7, height = 7, units = "in")
}

basePath <- paste('~/Desktop/propertyAnalysis/output/', get_current_datetime(), sep = "")
dir.create(basePath)

offset = 0
while (offset < yearsToGoBack) {
  startYear <- 2023-yearsBetweenStartAndEnd-offset
  endYear <- 2023-offset
  print("Cal")
  
  if(isSplitYearInTwo) {
    calculateAndPrint(startYear, endYear, basePath, 1, 6)
    calculateAndPrint(startYear, endYear, basePath, 7, 12)
  } else {
    calculateAndPrint(startYear, endYear, basePath, 1, 12)
  }
  
  
  offset <- offset + yearsBetweenStartAndEnd
}



print("DONE!")
















