import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGet1DayWeatherByCityQuery } from "@/feature/weather";
import { Location } from "@/types";
import { toast } from "react-toastify";
import Icon from "@/components/icon";
import { formatTemperature } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, setCurrentLocation } from "@/feature/locationsSlice";
import { selectIsCelsius, selectTheme } from "@/feature/settingsSlice";
import { setCurrentPageNumber } from "@/feature/pagesSlice";

function FavoriteCard({ location }: { location: Location }) {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const isCelsius = useSelector(selectIsCelsius);
  const { data, error, isLoading } = useGet1DayWeatherByCityQuery(
    location.Key,
    { skip: !location.Key }
  );

  const removeLocationFromFavorite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch(removeFavorite(location));
  };

  const onCardClick = () => {
    dispatch(setCurrentLocation(location));
    dispatch(setCurrentPageNumber(0));
  };

  if (error) {
    toast.error("Error fetching weather data");
    return null;
  }

  if (isLoading) {
    return <CircularProgress color="inherit" size={20} />;
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          textAlign: "center",
          background: theme.cardBackground,
          color: theme.cardColor,
          flex: 1,
          position: "relative",
          height: "100%",
        }}
      >
        <CardContent sx={{ p: 0, paddingBottom: "0 !important" }}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "transparent",
              color: theme.buttonColor,
              borderColor: "transparent",
              position: "absolute",
              top: 0,
              right: 0,
              ":hover": {
                backgroundColor: "transparent",
                color: theme.buttonHoverColor,
                borderColor: "transparent",
              },
            }}
            onClick={removeLocationFromFavorite}
          >
            <DeleteIcon />
          </Button>
          <Box sx={{ position: "relative", p: 2, pb: 3.5, mt: 3.5 }}>
            <button onClick={onCardClick} className="wrapper-button" />
            <Typography variant="h6">{location.LocalizedName}</Typography>
            {Boolean(data?.DailyForecasts[0].Day.Icon) && (
              <Icon number={data?.DailyForecasts[0].Day.Icon ?? 1} />
            )}
            <Typography sx={{ mb: 1.5 }}>
              {formatTemperature(
                data?.DailyForecasts[0].Temperature ?? {
                  Minimum: { Value: 0, Unit: "C", UnitType: 0 },
                  Maximum: { Value: 0, Unit: "C", UnitType: 0 },
                },
                isCelsius
              )}
            </Typography>
            {Boolean(data?.Headline.Text) && (
              <Typography variant="body2">{data?.Headline.Text}</Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default FavoriteCard;
