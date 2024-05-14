baseDir = "Desktop/PropertyAnalysis/propertyAnalysis/"

library(dplyr)
library(ggplot2)
library(scales)
if (!requireNamespace("stringr", quietly = TRUE)) {
  install.packages("stringr")
}


filtered_properties <- properties %>%
  filter(yearSold > 2016)


# , , , "Duplex", "SemiDetached""House","Townhouse"
typesToFetch <- c( "ApartmentUnitFlat")
filtered_properties <- filtered_properties %>%
  filter(propertyType %in% typesToFetch)


# Use the filter function to filter rows where the partial string is present
# 
#filtered_properties <- filtered_properties %>%
#  filter(str_detect(address, "Burleigh Street|Hill Ave|Ewart Street"))

filtered_properties <- filtered_properties %>%
  filter(beds == 2)

#filtered_properties <- filtered_properties %>%
#  filter(baths == 1)



filtered_properties$dateAndYear <- paste(filtered_properties$yearSold, filtered_properties$monthSold, sep = "-")

record_counts <- filtered_properties %>%
  group_by(propertyType, dateAndYear) %>%
  summarise(count = n(), .groups = "drop")




# Calculate median price for each month and year
median_prices <- filtered_properties %>%
  group_by(propertyType, dateAndYear) %>%
  summarise(median_price = median(price), .groups = "drop")


median_prices <- left_join(median_prices, record_counts, by = c("propertyType", "dateAndYear"))

rolling_average <- median_prices %>%
  group_by(propertyType) %>%
  mutate(rolling_average = zoo::rollmean(median_price, 6, align = "right", fill = NA))


plot_object <- ggplot(rolling_average, aes(x = dateAndYear, group = propertyType, color = propertyType)) +
  geom_line(aes(y = median_price), linetype = "dashed") +

  geom_text(aes(label = count, y = median_price), vjust = -0.5, color = "black", size = 3) + 
  geom_line(aes(y = rolling_average), linetype = "solid", size = 2) +  # Add rolling average trend line
  labs(title = "Median Price and Record Count for Each Month and Year",
       x = "Month and Year",
       y = "Median Price") +
  theme_minimal() +
  scale_y_continuous(name = "Median Price", labels = scales::number_format()) 




# Print the ggplot plot
print(plot_object)