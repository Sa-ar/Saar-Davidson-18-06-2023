import { ToastContainer } from "react-toastify";

import Header from "@/components/header";
import TabPanel from "@/components/tab-panel";
import SearchForecast from "@/pages/search-forecast";
import Favorites from "./pages/favorites";
import { selectTheme } from "./feature/settingsSlice";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { selectCurrentPageNumber } from "./feature/pagesSlice";

function App() {
  const currentPage = useSelector(selectCurrentPageNumber);
  const theme = useSelector(selectTheme);

  return (
    <Box
      component="div"
      sx={{
        background: theme.background,
        color: theme.color,
        minHeight: "100vh",
      }}
    >
      <Header />
      <TabPanel value={currentPage} index={0}>
        <SearchForecast />
      </TabPanel>
      <TabPanel value={currentPage} index={1}>
        <Favorites />
      </TabPanel>
      <ToastContainer />
    </Box>
  );
}

export default App;
