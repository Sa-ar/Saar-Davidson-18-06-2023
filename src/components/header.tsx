import { Container, Tab, Tabs, Typography } from "@mui/material";
import { SetStateAction } from "react";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Header({
  page,
  changePage,
}: {
  page: number;
  changePage: React.Dispatch<SetStateAction<number>>;
}) {
  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    changePage(newValue);
  };

  return (
    <Container
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 0,
      }}
    >
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Weather App
      </Typography>
      <Tabs
        value={page}
        onChange={handleChange}
        aria-label="basic tabs example"
      >
        <Tab label="Home" {...a11yProps(0)} />
        <Tab label="Favorites" {...a11yProps(1)} />
      </Tabs>
    </Container>
  );
}

export default Header;
