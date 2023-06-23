import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CircularProgress, Typography } from "@mui/material";

import Icon from "@/components/icon";
import DailyCard from "@/components/forecast/daily-card";
import { useGet5DayWeatherByCityQuery } from "@/feature/weather";
import { selectCurrentLocation, addFavorite } from "@/feature/locationsSlice";
import {
  formatAverageTemperature,
  formatTemperature,
  getDayOfWeek,
  weatherText,
} from "@/lib/utils";
import { DailyForecast } from "@/types";

function FiveDays() {
  const dispatch = useDispatch();
  const selectedCity = useSelector(selectCurrentLocation);
  const { data, error, isLoading } = useGet5DayWeatherByCityQuery(
    selectedCity.Key
  );

  const addToFavorites = () => {
    dispatch(addFavorite());
  };

  if (error) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
        backgroundColor: "rgb(160, 78, 157)",
        color: "white",
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
                    ) ?? []
                  )}
                </Typography>
              </Box>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "rgb(160, 78, 157)",
                ":hover": {
                  backgroundColor: "rgba(255, 255, 255, .2)",
                  color: "white",
                },
              }}
              onClick={addToFavorites}
            >
              Add to Favorites
            </Button>
          </Box>
          <Typography
            variant="h5"
            sx={{ width: "100%", textAlign: "center", margin: 3 }}
          >
            {data?.Headline.Text}
          </Typography>
          {data?.DailyForecasts.map((day: DailyForecast) => {
            return (
              <DailyCard
                key={day.Date}
                day={getDayOfWeek(day.Date)}
                temperature={formatTemperature(day.Temperature)}
                iconNumber={day.Day.Icon}
                shortPhrase={weatherText(day.Day.Icon)}
              />
            );
          })}
        </>
      )}
    </Box>
  );
}

export default FiveDays;
