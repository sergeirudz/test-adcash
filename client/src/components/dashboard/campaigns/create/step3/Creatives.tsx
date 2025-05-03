"use client";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useCreateCampaign } from "@/components/dashboard/campaigns/create/CreateCampaignContextProvider";

export interface CreativeType {
  name: string;
  value: string;
}

const CreativesTypes: CreativeType[] = [
  {
    name: "Pop-Under",
    value: "popunder",
  },
  {
    name: "Interstitial",
    value: "interstitial",
  },
  {
    name: "Native",
    value: "native",
  },
  {
    name: "Banner",
    value: "banner",
  },
  {
    name: "In-Page Push",
    value: "inpage-push",
  },
];

const Creatives = () => {
  const { campaignData, setCampaignData } = useCreateCampaign();
  const [creativeType, setCreativeType] = useState<CreativeType["value"]>(
    CreativesTypes[0].value,
  );
  const [landingPageUrl, setLandingPageUrl] = useState("");
  const [creatives, setCreatives] = useState<
    {
      url: string;
      title: string;
      description: string;
      creativeType: string;
      creative: string[];
    }[]
  >([]);

  useEffect(() => {
    setLandingPageUrl(campaignData.adCreatives[0]?.url || "");
    setCreativeType(
      (campaignData.adCreatives[0]
        ?.creativeType as unknown as CreativeType["value"]) ||
        CreativesTypes[0].value,
    );
  }, []);

  useEffect(() => {
    setCreatives([
      {
        url: landingPageUrl,
        title: "Example campaign",
        description: "",
        creativeType: creativeType,
        creative: [],
      },
    ]);
  }, [creativeType, landingPageUrl]);

  useEffect(() => {
    setCampaignData((prevData) => {
      return {
        ...prevData,
        adCreatives: creatives,
      };
    });
  }, [creatives, setCampaignData]);

  return (
    <FormControl
      sx={{
        gap: 3,
      }}
    >
      <FormLabel id="demo-row-radio-buttons-group-label">
        Step 1. Select creative type
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={creativeType}
        onChange={(e) => setCreativeType(e.target.value)}
        sx={{
          justifyContent: "space-between",
        }}
      >
        {CreativesTypes.map((type, index) => (
          <FormControlLabel
            value={type.value}
            control={<Radio />}
            label={type.name}
            key={index}
          />
        ))}
      </RadioGroup>
      <TextField
        name="landingPage"
        label="Landing page"
        variant="outlined"
        value={landingPageUrl}
        onChange={(e) => setLandingPageUrl(e.target.value)}
      />
    </FormControl>
  );
};

export default Creatives;
