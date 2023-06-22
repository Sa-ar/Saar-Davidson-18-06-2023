import { selectFavorites } from "@/feature/locationsSlice";
import { Container, Typography } from "@mui/material";
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
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {favorites.map((city) => city.LocalizedName).join(", ")}
        </Typography>
      )}
    </Container>
  );
}

export default Favorites;
