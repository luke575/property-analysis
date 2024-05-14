baseDir = "Desktop/PropertyAnalysis/propertyAnalysis/"

library(dplyr)
library(ggplot2)
library(scales)

########################## Start config
isLoadPropertyData <- 1
stateFilter <- ""
suburbsToFilter<- c()
########################## 

if(isLoadPropertyData) {
  properties <- read.csv(paste(baseDir, "clean_properties.csv", sep=""))
  
  if(stateFilter != "") {
    properties <- properties %>% filter(state.x == stateFilter)
  }
  
  if(length(suburbsToFilter) > 0) {
    properties <- properties %>%
      filter(suburb  %in% suburbsToFilter)  
  }
  
  groupedData <- properties %>% 
    filter(beds < 8) %>%
    group_by(yearSold, beds) %>% 
    summarise(medianPrice = median(price))
  
  percentage_change <- groupedData %>%
    arrange(yearSold, beds) %>%
    group_by(beds) %>%
    mutate(change = (medianPrice - lag(medianPrice)) / lag(medianPrice) * 100)
  
  print('~~ Property data read ~~')
}


label_data <- percentage_change %>%
  group_by(beds) %>%
  slice(n()) 

print(ggplot(data = percentage_change, aes(x = yearSold, y = change, color = beds)) +
        geom_bar(stat = "identity", position = "stack") +
        facet_wrap(~ beds)
  #theme(legend.position = "none")
  ) 


#print(ggplot(data = groupedData, aes(x = yearSold, y = medianPrice, fill = beds)) +
#        geom_bar(stat = "identity", position = "stack"))



print("DONE!")
















