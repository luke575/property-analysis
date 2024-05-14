baseDir = "Desktop/PropertyAnalysis/propertyAnalysis/"

library(dplyr)
library(ggplot2)
library(scales)

########################## Start config
isLoadPropertyData <- 1
stateFilter <- ""
suburbsToFilter<- c()
centralityToFilter <- c('burnside', 'hollywell', 'palm beach', 'eastern suburbs', 'airport west', 'caboolture')
########################## 

if(isLoadPropertyData) {
  suburbs <- read.csv(paste(baseDir, "clean_suburbs.csv", sep=""))
  
  if(stateFilter != "") {
    suburbs <- suburbs %>% filter(state.x == stateFilter)
  }
  
  if(length(suburbsToFilter) > 0) {
    suburbs <- suburbs %>%
      filter(suburb  %in% suburbsToFilter)  
  }
  
  if(length(centralityToFilter) > 0) {
    suburbs <- suburbs %>%
      filter(centrality  %in% centralityToFilter)  
  }
  
  groupedData <- suburbs %>% group_by(centrality, yearSold) %>% summarise(medianPrice = median(medianPrice))
  
  print('~~ Property data read ~~')
}


label_data <- groupedData %>%
  group_by(centrality) %>%
  slice(n()) 

print(ggplot(data = groupedData, aes(x = yearSold, y = medianPrice, color = centrality)) +
        geom_line() +
        geom_text(data = label_data, aes(label = centrality)) +
  scale_y_continuous(labels = scales::comma_format(prefix = "$")) 
  #theme(legend.position = "none")
  ) 




print("DONE!")
















