"use client";

import { JSX, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import GeoCountrySelect from "@/components/dashboard/campaigns/create/step1/GeoCountrySelect";
import { useCreateCampaign } from "@/components/dashboard/campaigns/create/CreateCampaignContextProvider";

export default function GeoTargeting(): JSX.Element {
  const { campaignData, setCampaignData } = useCreateCampaign();
  const [worldwide, setWorldwide] = useState(true);
  const [countries, setCountries] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  useEffect(() => {
    if (campaignData.geoTargeting) {
      setWorldwide(campaignData.geoTargeting.worldwide ?? true);
      setCountries(!campaignData.geoTargeting.worldwide);
      setSelectedCountries(campaignData.geoTargeting.countries || []);
    }
  }, []);

  useEffect(() => {
    setCampaignData((prevData) => {
      return {
        ...prevData,
        geoTargeting: {
          worldwide,
          countries: selectedCountries,
        },
      };
    });
  }, [worldwide, selectedCountries, setCampaignData]);

  const handleTargetingChange = (isWorldwide: boolean) => {
    setWorldwide(isWorldwide);
    setCountries(!isWorldwide);

    setCampaignData((prevData) => {
      if (isWorldwide) {
        return {
          ...prevData,
          geoTargeting: {
            worldwide: true,
            countries: [],
          },
          campaignGoals: prevData.campaignGoals.find(
            (goal) => goal.countryCode === "WW",
          )
            ? prevData.campaignGoals.filter((goal) => goal.countryCode === "WW")
            : [{ countryCode: "WW", payoutSum: 0 }],
        };
      } else {
        return {
          ...prevData,
          campaignGoals: [],
        };
      }
    });
  };

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
                value={worldwide ? "worldwide" : "countries"}
                onChange={(e) =>
                  handleTargetingChange(e.target.value === "worldwide")
                }
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Worldwide"
                  value="worldwide"
                />

                <FormControlLabel
                  value="countries"
                  control={<Radio />}
                  label="Countries"
                />
                {!worldwide && (
                  <GeoCountrySelect
                    selectedCountries={selectedCountries}
                    onCountriesChange={(countries) => {
                      setSelectedCountries(countries);
                    }}
                  />
                )}
              </RadioGroup>
            </FormControl>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
}
