"use client";

import { useCreateCampaignMutation } from "@/lib/redux/api/campaignsApi";

const CreateCampaign = () => {
  const [createCampaign, _createCampaignResponse] = useCreateCampaignMutation();

  function handleSubmit() {
    console.log(createCampaign, DUMMY_DATA);
    createCampaign(DUMMY_DATA);
  }

  return <button onClick={handleSubmit}>Create Campaign</button>;
};

export default CreateCampaign;

const DUMMY_DATA = {
  campaignName: "666",
  deviceType: [
    { type: "mobile", selected: true },
    { type: "desktop", selected: true },
    { type: "tablet", selected: false },
  ],
  geoTargeting: [
    { country: "US", targeting: "target" },
    { country: "CA", targeting: "target" },
  ],
  supplySources: [
    { source: "Google Ads", selected: true },
    { source: "Facebook", selected: true },
  ],
  userInterests: [
    { interest: "Technology", selected: true },
    { interest: "Fashion", selected: false },
  ],
  websiteCategories: [
    { category: "News", selected: true },
    { category: "Entertainment", selected: true },
  ],
  deviceOsTargeting: [
    { os: "iOS", version: "15+", selected: true },
    { os: "Android", version: "10+", selected: true },
  ],
  deviceBrowserVTargeting: [
    { browser: "Chrome", selected: true },
    { browser: "Safari", selected: true },
  ],
  deviceLanguageTargeting: [{ language: "English", selected: true }],
  contentTargeting: [
    { targeting: "target", domain: "example.com", type: "domain" },
    { targeting: "exclude", urlKeywords: "competitors", type: "urlKeywords" },
  ],
  trafficRestrictions: [{ source: "adult", allow: false }],
  connectionType: [
    { type: "cableDSL", targeting: "target" },
    { type: "cellular", targeting: "target" },
  ],
  connectionOrganizationsIsp: [{ name: "Verizon", targeting: "target" }],
  adCreatives: [
    {
      url: "https://example.com/landing",
      title: "Summer Sale",
      description: "Get 50% off on all items",
      creativeType: "banner",
      creative: ["https://picsum.photos/600/300"],
    },
  ],
  weeklyDistribution: [
    {
      "247": false,
      time: {
        start: "09:00",
        end: "18:00",
        days: [1, 2, 3, 4, 5],
      },
    },
  ],
  budget: [{ type: "custom", daily: 100, total: 3000 }],
  campaignScheduling: [
    {
      start: "2024-06-01T00:00:00.000Z",
      end: "2024-06-30T23:59:59.999Z",
    },
  ],
  zoneCapping: [{ zone: "US-East", impressions: 1000 }],
  statusAfterValidation: true,
  capping: {
    type: "cpm",
    amount: 2.5,
    frequencyCapping: {
      limit: 3,
      periodValue: 24,
      periodType: "hour",
    },
    applyTo: {
      type: "ip",
      ips: [],
    },
    bidding: [],
  },
  active: true,
  createdAt: "2024-05-25T12:00:00.000Z",
};
