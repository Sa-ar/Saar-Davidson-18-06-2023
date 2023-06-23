import FavoriteCard from "@/components/favorite-card";
import { selectFavorites } from "@/feature/locationsSlice";
import { Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Favorites() {
  const favorites = useSelector(selectFavorites);
  return (
    <Container
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 2,
        p: 2,
      }}
    >
      <Typography variant="h4" sx={{ flexGrow: 1 }}>
        Favorites
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          No Favorites
        </Typography>
      ) : (
        <Grid container>
          {favorites.map((location) => (
            <FavoriteCard location={location} />
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Favorites;
