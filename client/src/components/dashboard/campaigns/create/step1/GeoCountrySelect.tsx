"use client";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import type { Dispatch, SetStateAction, FC } from "react";
import { countries } from "@/components/dashboard/campaigns/create/config";

interface GeoCountrySelectProps {
  selectedCountries: string[];
  onCountriesChange: Dispatch<SetStateAction<string[]>>;
}

const GeoCountrySelect: FC<GeoCountrySelectProps> = ({
  selectedCountries,
  onCountriesChange,
}) => {
  const selectedCountryObjects =
    countries.filter((country) => selectedCountries?.includes(country.code)) ||
    [];

  return (
    <Autocomplete
      multiple
      id="country-select-demo"
      sx={{ width: "100%" }}
      options={countries}
      value={selectedCountryObjects}
      onChange={(_, newValue) => {
        const newCountryCodes = newValue.map((country) => country.code);
        onCountriesChange(newCountryCodes);
      }}
      autoHighlight
      filterSelectedOptions
      getOptionLabel={(option) => option.label}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => {
          const { key, ...tagProps } = getTagProps({ index });
          return (
            <Chip
              key={key}
              avatar={
                <img
                  loading="lazy"
                  width="20"
                  height="14"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                  style={{ marginLeft: 5 }}
                />
              }
              label={option.label}
              {...tagProps}
              size="small"
            />
          );
        })
      }
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            <img
              loading="lazy"
              width="20"
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              alt=""
            />
            {option.label} ({option.code})
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose countries"
          placeholder="Select countries"
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

export default GeoCountrySelect;
