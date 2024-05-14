baseDir = "Desktop/propertyAnalysis/"

library("ggmap")
library(dplyr)
library(ggplot2)
source(paste(baseDir, "helpers.R", sep=""))



########################## Start config
isLoadPropertyData <- 1

zoomLevel = 12

yearsBetweenStartAndEnd = 2;
yearsToGoBack <- 20 # 20 is what we set to usuallly

mapToUse <- Brisbane

########################## 

if(isLoadPropertyData) {
  suburbFile = paste(baseDir, "clean_suburbs.csv", sep="")
  suburbs <- read.csv(suburbFile)  
  print('~~ Property data read ~~')
}





calculateAndPrint <- function(startYear, endYear, basePath) {
  title <- paste(startYear, endYear,  sep = " - ")
  print(title)

  df_growth <- suburbs %>%
    filter(yearSold >= startYear & yearSold <= endYear) %>%
    group_by(centrality, lat, lng) %>%
    arrange(yearSold) %>%
    mutate(priseRise = round((last(medianPrice) - first(medianPrice)) / first(medianPrice) * 100, 1)) %>%
    mutate(dotColor = ifelse(priseRise > 0, "green", "red")) %>%
    mutate(dotSize = getDotSize(priseRise))%>%
    ungroup()
  
  
  map <- get_stamenmap(mapToUse, zoom = zoomLevel, maptype = "terrain")
  
  
  color_map <- c("red" = "red", "green" = "green")
  
  generatedMap <- ggmap(map) +
    geom_point(data = df_growth, mapping = aes(x = lng, y = lat, color = dotColor, size=dotSize)) +
    
    geom_text(data = df_growth, mapping = aes(x = lng, y = lat, label = centrality), size=3) +
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
  
  calculateAndPrint(startYear, endYear, basePath)
  
  offset <- offset + yearsBetweenStartAndEnd
}



print("DONE!")
















