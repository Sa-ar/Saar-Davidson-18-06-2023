import { ChangeEvent, SyntheticEvent } from "react";
import { DebounceInput } from "react-debounce-input";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useLazyGetAutoCompleteQuery } from "@/feature/weather";
import { Location } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "@/feature/locationsSlice";
import { selectTheme } from "@/feature/settingsSlice";

function Search() {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const [getAutoComplete, { data = [], isLoading }] =
    useLazyGetAutoCompleteQuery();

  function onInputChanged(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value.trim();

    if (searchValue.length > 2) {
      getAutoComplete(searchValue, true);
    }
  }

  function onChange(_e: SyntheticEvent, option: string | Location | null) {
    if (typeof option === "string") {
      return;
    }

    if (option) {
      dispatch(setCurrentLocation(option));
    }
  }

  return (
    <Autocomplete
      freeSolo
      options={data}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.LocalizedName
      }
      sx={{ width: 300, color: theme.color }}
      onChange={onChange}
      loading={isLoading}
      renderInput={(params) => (
        <DebounceInput
          {...params}
          debounceTimeout={500}
          element={TextField}
          onChange={onInputChanged}
          label="Location search"
          variant="filled"
          fullWidth
          sx={{
            backgroundColor: theme.cardBackground,
            color: theme.color,
            borderColor: theme.color,
            "& .MuiFormLabel-root, & .Mui-Focused": {
              color: theme.cardColor,
            },
            "& .MuiInputBase-root::after": {
              borderColor: theme.color,
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

export default Search;
