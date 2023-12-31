import { selectTheme } from "@/feature/settingsSlice";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
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
    <Box
      sx={{
        bgcolor: theme.cardBackground,
        color: theme.color,
        width: "100%",
      }}
    >
      <Container
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "1rem",
          p: 1,
          paddingBottom: 0,
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            gap: 1,
            display: "flex",
            alignItems: "center",
            fontWeight: "bold",
            paddingBottom: 1,
          }}
        >
          <img src="/spinomenal_logo.webp" alt="logo" height="32" width="32" />
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
                padding: 0.5,
                paddingBottom: 1,
                minWidth: "auto",
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
    </Box>
  );
}

export default Header;
