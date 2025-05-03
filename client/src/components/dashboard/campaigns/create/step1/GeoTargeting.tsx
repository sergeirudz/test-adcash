"use client";

import type { JSX } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import GeoCountrySelect from "@/components/dashboard/campaigns/create/step1/GeoCountrySelect";

export default function GeoTargeting(): JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader
          title="Geotargeting"
          subheader="Select which countries, regions or cities you want to target. You can also paste a list of country codes, each on a new line or separate them using commans or semicolons."
        />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: "sm" }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="worldwide"
                  control={<Radio />}
                  label="Worldwide"
                />

                <FormControlLabel
                  value="countries"
                  control={<Radio />}
                  label="Countries"
                />
                <GeoCountrySelect />
              </RadioGroup>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
