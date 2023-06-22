import { ChangeEvent, SyntheticEvent } from "react";
import { DebounceInput } from "react-debounce-input";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useLazyGetAutoCompleteQuery } from "../feature/weather";
import { Location } from "../types";

function Search({
  onSelect,
}: {
  onSelect: (e: SyntheticEvent, option: { value: string; key: string }) => void;
}) {
  const [getAutoComplete, { data = [], isLoading }] =
    useLazyGetAutoCompleteQuery();

  function onInputChanged(e: ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value.trim();

    if (searchValue.length > 2) {
      getAutoComplete(searchValue, true);
    }
  }

  function onChange(
    e: SyntheticEvent,
    option: string | { value: string; key: string } | null
  ) {
    if (typeof option === "string") {
      return onSelect(e, { value: option, key: "" });
    }
    if (option) {
      return onSelect(e, option);
    }
  }

  return (
    <Autocomplete
      freeSolo
      options={data.map((city: Location) => {
        return { value: city.LocalizedName, key: city.Key };
      })}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.value
      }
      sx={{ width: 300 }}
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
