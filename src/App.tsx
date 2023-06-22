import { ToastContainer } from "react-toastify";
import Search from "@/components/search";
import FiveDays from "./components/forecast/five-days";
import { Container } from "@mui/material";

function App() {
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
      <ToastContainer />
    </Container>
  );
}

export default App;
