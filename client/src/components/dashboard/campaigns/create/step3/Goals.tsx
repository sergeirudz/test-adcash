"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { NumericFormat } from "react-number-format";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import { useCreateCampaign } from "@/components/dashboard/campaigns/create/CreateCampaignContextProvider";
import { useEffect, useState, useMemo } from "react";
import {
  type CountryType,
  countries,
} from "@/components/dashboard/campaigns/create/config";

const Goals = () => {
  const { campaignData, setCampaignData } = useCreateCampaign();
  const [availableCountries, setAvailableCountries] = useState<CountryType[]>(
    [],
  );
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null,
  );
  const [payoutAmount, setPayoutAmount] = useState<string>("0");
  const [worldwideAmount, setWorldwideAmount] = useState<string>("0");

  useEffect(() => {
    const worldwideGoal = campaignData.campaignGoals.find(
      (goal) => goal.countryCode === "WW",
    );
    if (worldwideGoal) {
      setWorldwideAmount(worldwideGoal.payoutSum.toString());
    }

    if (
      campaignData.geoTargeting &&
      campaignData.geoTargeting.countries.length > 0
    ) {
      const selectedCountries = countries.filter((country) =>
        campaignData.geoTargeting.countries.includes(country.code),
      );
      setAvailableCountries(selectedCountries);
    } else {
      setAvailableCountries([]);
    }
  }, [campaignData.geoTargeting, campaignData.campaignGoals]);

  const campaignGoalsWithLabels = useMemo(() => {
    return campaignData.campaignGoals
      .filter((goal) => goal.countryCode !== "WW")
      .map((goal) => {
        const country = countries.find((c) => c.code === goal.countryCode);
        return {
          ...goal,
          countryLabel: country?.label || goal.countryCode,
        };
      });
  }, [campaignData.campaignGoals]);

  const handleAddPayout = () => {
    if (!selectedCountry || !payoutAmount) return;

    setCampaignData((prevData) => {
      const existingIndex = prevData.campaignGoals.findIndex(
        (goal) => goal.countryCode === selectedCountry.code,
      );

      let updatedGoals;
      if (existingIndex >= 0) {
        updatedGoals = [...prevData.campaignGoals];
        updatedGoals[existingIndex] = {
          countryCode: selectedCountry.code,
          payoutSum: parseFloat(payoutAmount) || 0,
        };
      } else {
        updatedGoals = [
          ...prevData.campaignGoals,
          {
            countryCode: selectedCountry.code,
            payoutSum: parseFloat(payoutAmount) || 0,
          },
        ];
      }

      return {
        ...prevData,
        campaignGoals: updatedGoals,
      };
    });

    setSelectedCountry(null);
    setPayoutAmount("0");
  };

  const handleWorldwidePayoutChange = (value: string) => {
    setWorldwideAmount(value);

    setCampaignData((prevData) => {
      const filteredGoals = prevData.campaignGoals.filter(
        (goal) => goal.countryCode !== "WW",
      );

      return {
        ...prevData,
        campaignGoals: [
          ...filteredGoals,
          {
            countryCode: "WW",
            payoutSum: parseFloat(value) || 0,
          },
        ],
      };
    });
  };

  const handleDeletePayout = (countryCode: string) => {
    setCampaignData((prevData) => ({
      ...prevData,
      campaignGoals: prevData.campaignGoals.filter(
        (goal) => goal.countryCode !== countryCode,
      ),
    }));
  };

  if (campaignData.geoTargeting.worldwide) {
    return (
      <FormControl fullWidth sx={{ mt: 2 }}>
        <FormLabel id="country-goals-label" sx={{ mb: 1 }}>
          Step 2. Campaign Goals
        </FormLabel>
        <Box
          sx={{
            mt: 2,
            mb: 2,
            p: 2,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography sx={{ flexGrow: 1 }}>
              <strong>Worldwide</strong> payout:
            </Typography>
            <NumericFormat
              value={worldwideAmount}
              onValueChange={(values) =>
                handleWorldwidePayoutChange(values.value)
              }
              customInput={TextField}
              thousandSeparator
              prefix="$"
              label="Payout amount"
              sx={{ width: 150 }}
            />
          </Stack>
        </Box>
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth sx={{ mt: 2 }}>
      <FormLabel id="country-goals-label" sx={{ mb: 1 }}>
        Step 2. Add Campaign Goals
      </FormLabel>

      {availableCountries.length > 0 ? (
        <>
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Autocomplete
              id="country-select-demo"
              options={availableCountries}
              disabled={availableCountries.length === 0}
              autoHighlight
              value={selectedCountry}
              onChange={(_, newValue) => setSelectedCountry(newValue)}
              sx={{ width: 300 }}
              getOptionLabel={(option) => option.label}
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
                  label="Select country for payout"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />

            <NumericFormat
              value={payoutAmount}
              onValueChange={(values) => {
                setPayoutAmount(values.value);
              }}
              customInput={TextField}
              thousandSeparator
              prefix="$"
              label="Payout amount"
              sx={{ width: 150 }}
            />

            <Button
              variant="contained"
              onClick={handleAddPayout}
              disabled={!selectedCountry}
            >
              Add Payout
            </Button>
          </Stack>

          {campaignGoalsWithLabels.length > 0 ? (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Country Payouts
              </Typography>
              <Stack spacing={1}>
                {campaignGoalsWithLabels.map((payout) => (
                  <Paper key={payout.countryCode} sx={{ p: 2 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <img
                          loading="lazy"
                          width="20"
                          height="14"
                          src={`https://flagcdn.com/w20/${payout.countryCode.toLowerCase()}.png`}
                          alt=""
                          style={{ marginRight: 8 }}
                        />
                        <Typography>{payout.countryLabel}</Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ mr: 2 }}>
                          ${payout.payoutSum.toFixed(2)}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleDeletePayout(payout.countryCode)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          ) : (
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              No payouts set. Add a country and payout amount above.
            </Typography>
          )}
        </>
      ) : (
        <Box sx={{ mb: 2 }}>
          No countries selected in (1. General Information) Geotargeting. Please
          select countries in the Geo Targeting step first.
        </Box>
      )}
    </FormControl>
  );
};

export default Goals;
