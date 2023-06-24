import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import Icon from "@/components/icon";
import DailyCard from "@/components/forecast/daily-card";
import { useGet5DayWeatherByCityQuery } from "@/feature/weather";
import {
  selectCurrentLocation,
  selectFavorites,
  switchFavorite,
} from "@/feature/locationsSlice";
import {
  formatAverageTemperature,
  formatTemperature,
  getDayOfWeek,
  weatherText,
} from "@/lib/utils";
import { DailyForecast } from "@/types";
import { selectIsCelsius, selectTheme } from "@/feature/settingsSlice";

function FiveDays() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isCelsius = useSelector(selectIsCelsius);
  const favorites = useSelector(selectFavorites);
  const selectedCity = useSelector(selectCurrentLocation);
  const isInFavorites = favorites.some(
    (favorite) => favorite.Key === selectedCity.Key
  );
  const { data, error, isLoading } = useGet5DayWeatherByCityQuery(
    selectedCity.Key
  );

  const switchFavoritesHandler = () => {
    dispatch(switchFavorite());
  };

  if (error) {
    toast.error("Error fetching weather data");
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        backgroundColor: theme.cardBackground,
        color: theme.cardColor,
        width: "100%",
        height: "100%",
        p: 2,
        borderRadius: 1,
      }}
    >
      {isLoading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "space-between",
              margin: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Icon number={data?.DailyForecasts[0].Day.Icon ?? 1} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h6">
                  {selectedCity.LocalizedName}
                </Typography>
                <Typography variant="body2">
                  {formatAverageTemperature(
                    data?.DailyForecasts.map(
                      (forecast) => forecast.Temperature
                    ) ?? [],
                    isCelsius
                  )}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.buttonBackground,
                color: theme.buttonColor,
                ":hover": {
                  backgroundColor: theme.buttonHoverBackground,
                  color: theme.buttonHoverColor,
                },
              }}
              onClick={switchFavoritesHandler}
            >
              {/* <FavoriteBorderIcon /> */}
              {isInFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </Button>
          </Box>
          <Typography
            variant="h5"
            sx={{ width: "100%", textAlign: "center", margin: 3 }}
          >
            {data?.Headline.Text}
          </Typography>
          <Grid container spacing={1} columns={10}>
            {data?.DailyForecasts.map((day: DailyForecast) => {
              return (
                <Grid item xs={10} sm={5} md={2} lg={2} key={day.Date}>
                  <DailyCard
                    day={getDayOfWeek(day.Date)}
                    temperature={formatTemperature(day.Temperature, isCelsius)}
                    iconNumber={day.Day.Icon}
                    shortPhrase={weatherText(day.Day.Icon)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
}

export default FiveDays;
