import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGet1DayWeatherByCityQuery } from "@/feature/weather";
import { Location } from "@/types";
import { toast } from "react-toastify";
import Icon from "@/components/icon";
import { formatTemperature } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { removeFavorite } from "@/feature/locationsSlice";

function FavoriteCard({ location }: { location: Location }) {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGet1DayWeatherByCityQuery(
    location.Key,
    { skip: !location.Key }
  );

  const removeLocationFromFavorite = () => {
    dispatch(removeFavorite(location));
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
          background: "rgb(160, 78, 157)",
          color: "white",
          flex: 1,
          position: "relative",
        }}
      >
        <CardContent>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "transparent",
              color: "white",
              borderColor: "transparent",
              position: "absolute",
              top: 0,
              right: 0,
              ":hover": {
                backgroundColor: "transparent",
                color: "rgba(255, 255, 255, 0.5)",
                borderColor: "transparent",
              },
            }}
            onClick={removeLocationFromFavorite}
          >
            <DeleteIcon />
          </Button>
          <Typography variant="h6">{location.LocalizedName}</Typography>
          {Boolean(data?.DailyForecasts[0].Day.Icon) && (
            <Icon number={data?.DailyForecasts[0].Day.Icon ?? 1} />
          )}
          <Typography sx={{ mb: 1.5 }}>
            {formatTemperature(
              data?.DailyForecasts[0].Temperature ?? {
                Minimum: { Value: 0, Unit: "C", UnitType: 0 },
                Maximum: { Value: 0, Unit: "C", UnitType: 0 },
              }
            )}
          </Typography>
          {Boolean(data?.Headline.Text) && (
            <Typography variant="body2">{data?.Headline.Text}</Typography>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
}

export default FavoriteCard;