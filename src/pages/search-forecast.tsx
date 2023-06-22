import FiveDays from "@/components/forecast/five-days";
import Search from "@/components/search";
import { Container } from "@mui/material";

function SearchForecast() {
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
      <Search />
      <FiveDays />
    </Container>
  );
}

export default SearchForecast;
