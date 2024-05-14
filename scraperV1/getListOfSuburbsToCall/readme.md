Source data:
https://github.com/michalsn/australian-suburbs/blob/master/data/suburbs.json

For each item in source data
Call domain autocomplete -> https://www.domain.com.au/phoenix/api/locations/autocomplete/v2?prefixText=melbourne&stateBoost=qld
On array returned, save value to file

We now have a list of suburbs which we can use to scrape domain website

