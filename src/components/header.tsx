import { selectTheme } from "@/feature/settingsSlice";
import { Container, Tab, Tabs, Typography } from "@mui/material";
import { SetStateAction } from "react";
import { useSelector } from "react-redux";
import SettingsButton from "./settings-button";

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
  const theme = useSelector(selectTheme);
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
        bgcolor: theme.background,
        color: theme.color,
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, gap: 1, display: "flex", alignItems: "center" }}
      >
        <img src="/spinomenal_logo.webp" alt="logo" height="32" />
        Weather
      </Typography>
      <Tabs
        value={page}
        onChange={handleChange}
        aria-label="pages"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: theme.buttonColor,
          },
        }}
      >
        <Tab
          label="Home"
          {...a11yProps(0)}
          sx={{
            color: theme.color,
            "&.MuiTab-root": {
              outlineColor: theme.buttonColor,
            },
            "&.Mui-selected": {
              color: theme.buttonColor,
            },
          }}
        />
        <Tab
          label="Favorites"
          {...a11yProps(1)}
          sx={{
            color: theme.color,
            "&.MuiTab-root": {
              outlineColor: theme.buttonColor,
            },
            "&.Mui-selected": {
              color: theme.buttonColor,
            },
          }}
        />
      </Tabs>
      <SettingsButton />
    </Container>
  );
}

export default Header;
