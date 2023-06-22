import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Header from "@/components/header";
import TabPanel from "@/components/tab-panel";
import SearchForecast from "@/pages/search-forecast";
import Favorites from "./pages/favorites";

function App() {
  const [page, setPage] = useState(0);

  return (
    <>
      <Header page={page} changePage={setPage} />
      <TabPanel value={page} index={0}>
        <SearchForecast />
      </TabPanel>
      <TabPanel value={page} index={1}>
        <Favorites />
      </TabPanel>
      <ToastContainer />
    </>
  );
}

export default App;
