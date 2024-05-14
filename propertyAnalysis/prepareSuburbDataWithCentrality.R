# Set the global option to suppress scientific notation
options(scipen = 999)

library(dplyr)
library(geosphere)
library(tidyr)


startTime <- Sys.time()

fiveKm = 5000 
find_closest_centrality <- function(lat, lon, suburb, id) {
  
  if (id %% 10000 == 0) {
    secondsElapsed <- as.numeric(difftime(Sys.time(), startTime, units = "secs"))
    print(paste("Seconds Elapsed:", secondsElapsed))
    startTime <<- Sys.time()
  }
  
  min_distance <- Inf
  closest_name <- NA
  
  for (i in seq_len(nrow(centralities))) {
    distanceInIteration <- distGeo(c(centralities$lng[i], centralities$lat[i]), c(lon, lat))
    if (distanceInIteration < min_distance) {
      min_distance <- distanceInIteration
      returnName <- centralities$name[i]
      returnLat <- centralities$lat[i]
      returnLng <- centralities$lng[i]
    }
    if(distanceInIteration < fiveKm) {
      break
    }
  }
  
  if (min_distance > fiveKm) {
    print(paste('adding a new record', suburb))
    new_record <- data.frame(
      name = suburb,
      lat = lat,
      lng = lon
    )
    
    centralities <<- rbind(new_record, centralities)
    return(paste(suburb, lat, lon, sep=",")) 
  } else {
    return(paste(returnName, returnLat, returnLng, sep=",")) 
  }
}


baseDir = "Desktop/propertyAnalysis/"
centralitiesFile = paste(baseDir, "centralities.csv", sep="")
inputFile = paste(baseDir, "raw_data/raw_properties.csv", sep="")
suburbGeoFile = paste(baseDir, "suburb_coordinates.csv", sep="")
outputFile = paste(baseDir, "clean_suburbs.csv", sep="")

centralities <- read.csv2(centralitiesFile, sep = ",")
properties <- read.csv(inputFile)
suburbsWithGeoLocation <- read.csv(suburbGeoFile)

suburbsWithGeoLocation$suburb <- tolower(suburbsWithGeoLocation$suburb)



#temporary
#temporary
#temporary
#temporary
#properties <- head(properties, 1000)

#properties <- properties %>%
#  filter(state == 'VIC')
#temporary
#temporary
#temporary
#temporary


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

centralities$lat <- as.numeric(centralities$lat)
centralities$lng <- as.numeric(centralities$lng)

properties <- properties %>% filter(yearSold >= 2005)


# Start geo

properties <- merge(properties, suburbsWithGeoLocation, by = "suburb")


suburbs <- properties %>%
  group_by(state.x, suburb, yearSold, lat, lng) %>%
  summarise(medianPrice = median(price))


suburbs$id <- 1:nrow(suburbs)
suburbs$main <- mapply(find_closest_centrality, suburbs$lat, suburbs$lng, suburbs$suburb, suburbs$id)
suburbs <- separate(suburbs, col = main, into = c("centrality", "lat", "lng"), sep = ",")


# End geo


write.table(suburbs, file = outputFile, sep = ",", row.names = FALSE)

print('~~ Done ~~')