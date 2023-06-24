import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Header from "@/components/header";
import TabPanel from "@/components/tab-panel";
import SearchForecast from "@/pages/search-forecast";
import Favorites from "./pages/favorites";
import { selectTheme } from "./feature/settingsSlice";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

function App() {
  const [page, setPage] = useState(0);
  const theme = useSelector(selectTheme);

  return (
    <Box
      sx={{
        background: theme.background,
        color: theme.color,
        minHeight: "100vh",
      }}
    >
      <Header page={page} changePage={setPage} />
      <TabPanel value={page} index={0}>
        <SearchForecast />
      </TabPanel>
      <TabPanel value={page} index={1}>
        <Favorites />
      </TabPanel>
      <ToastContainer />
    </Box>
  );
}

export default App;
