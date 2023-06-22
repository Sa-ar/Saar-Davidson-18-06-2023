import { Box, CircularProgress, Typography } from "@mui/material";
import Icon from "@/components/icon";
import DailyCard from "@/components/forecast/daily-card";
import { useGet5DayWeatherByCityQuery } from "@/feature/weather";
import { DailyForecast } from "@/types";
import {
  formatAverageTemperature,
  formatTemperature,
  getDayOfWeek,
  weatherText,
} from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function FiveDays() {
  const selectedCity = useSelector((state: RootState) => state.selectedCity);
  const { data, error, isLoading } = useGet5DayWeatherByCityQuery(
    selectedCity.location.Key
  );

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
                {selectedCity.location.LocalizedName}
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
