import { selectTheme } from "@/feature/settingsSlice";
import { Container, Tab, Tabs, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SettingsButton from "./settings-button";
import {
  selectCurrentPageNumber,
  selectPages,
  setCurrentPageNumber,
} from "@/feature/pagesSlice";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Header() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const pages = useSelector(selectPages);
  const currentPage = useSelector(selectCurrentPageNumber);

  const handleChange = (_e: React.SyntheticEvent, newValue: number) => {
    dispatch(setCurrentPageNumber(newValue));
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
        value={currentPage}
        onChange={handleChange}
        aria-label="pages"
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: theme.buttonColor,
          },
        }}
      >
        {pages.map((page) => (
          <Tab
            key={page.number}
            label={page.label}
            {...a11yProps(page.number)}
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
        ))}
      </Tabs>
      <SettingsButton />
    </Container>
  );
}

export default Header;
