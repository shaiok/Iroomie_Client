import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment } from "@mui/material";
import Input from "./Input";

export default function AutocompleteCombobox({
  options,
  label,
  placeholder,
  icon,
  onChange,
  disabled ,  // Add this line
}) {
  const isPlainList =
    typeof options[0] !== "object" || !options[0].hasOwnProperty("title");
  const hasCategoriesOption =
    !isPlainList && options[0].hasOwnProperty("category");

  const processedOptions = React.useMemo(() => {
    if (isPlainList) {
      return options.map((option) => ({ label: option }));
    }

    if (hasCategoriesOption) {
      return options;
    }

    return options.map((option) => {
      const firstLetter = option.title[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });
  }, [options, isPlainList, hasCategoriesOption]);

  const sortedOptions = React.useMemo(() => {
    if (isPlainList || hasCategoriesOption) {
      return processedOptions;
    }
    return processedOptions.sort(
      (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
    );
  }, [processedOptions, isPlainList, hasCategoriesOption]);

  return (
    <Autocomplete
      id="dynamic-autocomplete"
      options={sortedOptions}
      onChange={onChange}
      disabled={disabled}  // Add this line
      groupBy={(option) =>
        hasCategoriesOption
          ? option.category
          : isPlainList
          ? null
          : option.firstLetter
      }
      getOptionLabel={(option) =>
        isPlainList
          ? option.label
          : hasCategoriesOption
          ? option.title
          : option.title
      }
      renderInput={(params) => (
        <Input
          label={label}
          placeholder={placeholder}
          icon={icon}
          disabled={disabled} 
          {...params}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <>
                {icon && (
                  <InputAdornment position="start">{icon}</InputAdornment>
                )}
                {params.InputProps.startAdornment}
              </>
            ),
          }}
        />
      )}
      // renderOption={renderOption}
    />
  );
}