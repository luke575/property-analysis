########################## Constants
EastCoast <-
  c(
    left = 143.6,
    bottom = -38.9,
    right = 153.613,
    top = -26.0
  )

GoldCoast_Brisbane_SunshineCoast <-
  c(
    left = 152.64,
    bottom = -28.19,
    right = 153.613,
    top = -26.0
  )

GoldCoast <-
  c(
    left = 153.2,
    bottom = -28.19,
    right = 153.613,
    top = -27.8
  )

Brisbane <-
  c(
    left = 152.69,
    bottom = -27.8,
    right = 153.3,
    top = -27.0
  )

All_QLD <-
  c(
    left = 144.8,
    bottom = -28.19,
    right = 153.613,
    top = -16.1
  )

Melbourne <-
  c(
    left = 144.58,
    bottom = -38,
    right = 145.38,
    top = -37.57
  )



getDotSize <- function(percentage) {
  percentage <- abs(percentage)
  
  ifelse(percentage < 50, 3,
         ifelse(percentage < 100, 8,
                ifelse(percentage < 150, 12,
                       ifelse(percentage < 200, 20, 25))))
}

get_current_datetime <- function() {
  current_datetime <- format(Sys.time(), "%Y-%m-%d %H-%M-%S")
  return(current_datetime)
}
