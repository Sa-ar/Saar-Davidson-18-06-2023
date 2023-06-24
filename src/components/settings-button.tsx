import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Switch, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isDarkTheme,
  selectIsCelsius,
  selectTheme,
  switchTheme,
  switchUnits,
} from "@/feature/settingsSlice";

function SettingsButton() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useSelector(selectTheme);
  const isCelsius = useSelector(selectIsCelsius);
  const isDark = isDarkTheme(theme);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const switchThemeHandler = () => {
    dispatch(switchTheme());
  };

  const switchUnitHandler = () => {
    dispatch(switchUnits());
  };

  return (
    <>
      <IconButton
        onClick={handleClickOpen}
        sx={{
          color: "currentcolor",
          outlineColor: "currentcolor",
          p: 0,
          paddingBottom: 1,
        }}
      >
        <SettingsIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ color: theme.color, background: theme.background }}
        >
          App Settings
        </DialogTitle>
        <DialogContent
          sx={{ color: theme.color, background: theme.background }}
        >
          <Typography>
            Dark Mode
            <Switch
              checked={isDark}
              onChange={switchThemeHandler}
              sx={{
                "& .Mui-checked": { color: `${theme.color} !important` },
                "& .Mui-checked + .MuiSwitch-track": {
                  bgcolor: `${theme.color} !important`,
                },
              }}
            />
          </Typography>

          <Typography>
            Fahrenheit
            <Switch
              checked={isCelsius}
              onChange={switchUnitHandler}
              sx={{
                "& .Mui-checked": { color: `${theme.color} !important` },
                "& .Mui-checked + .MuiSwitch-track": {
                  bgcolor: `${theme.color} !important`,
                },
              }}
            />
            Celsius
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default SettingsButton;
