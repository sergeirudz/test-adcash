"use client";

import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import {
  useDeleteCampaignByIdMutation,
  useGetCampaignsQuery,
} from "@/lib/redux/api/campaignsApi";
import CampaignsTableToolbar from "@/components/dashboard/campaigns/list/CampaignsTableToolbar";
import { Box, List, ListItem, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const CampaignsTable: FC = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    sortBy: ["createdAt:DESC"],
    filter: {},
  });
  const { data, isLoading } = useGetCampaignsQuery(queryParams);

  const [deleteCampaign, _deleteCampaignResponse] =
    useDeleteCampaignByIdMutation();

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    const filter: Record<string, any> = {};

    if (filterModel.items && filterModel.items.length > 0) {
      for (const item of filterModel.items) {
        if (item.field === "campaignName") {
          filter.campaignName = item.value;
        } else if (item.field === "active" && item.value !== undefined) {
          filter.active = item.value;
        } else if (item.field === "landingPages") {
          filter.adCreativeUrl = item.value;
        }
      }
    }

    setQueryParams((prev) => ({
      ...prev,
      filter,
    }));
  }, []);

  const renderLandingPages = (params: GridRenderCellParams) => {
    const adCreatives = params.row.adCreatives || [];

    if (adCreatives.length === 0)
      return <Typography variant="body2">No landing pages</Typography>;

    return (
      <List dense disablePadding sx={{ maxHeight: 120, overflow: "auto" }}>
        {adCreatives.map((creative: any, index: number) => (
          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
            <Typography variant="caption" component="div" noWrap>
              {`(${creative.creativeType}) ${creative.url}`}
            </Typography>
          </ListItem>
        ))}
      </List>
    );
  };

  const renderPayouts = (params: GridRenderCellParams) => {
    const campaignGoals = params.row.campaignGoals || [];

    if (campaignGoals.length === 0)
      return <Typography variant="body2">No payouts set</Typography>;

    return (
      <List dense disablePadding sx={{ maxHeight: 120, overflow: "auto" }}>
        {campaignGoals.map((goal: any, index: number) => (
          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
            <Box display="flex" alignItems="center">
              <img
                loading="lazy"
                width="20"
                height="14"
                src={`https://flagcdn.com/w20/${goal.countryCode.toLowerCase()}.png`}
                alt=""
                style={{ marginRight: 5 }}
              />
              <Typography variant="caption" component="div" noWrap>
                {`${goal.countryCode}: $${goal.payoutSum}`}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    );
  };
  const renderActions = (params: GridRenderCellParams) => {
    return (
      <Box>
        <Button onClick={() => deleteCampaign(params.id)} variant="text">
          Delete
        </Button>
      </Box>
    );
  };

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "campaignName", headerName: "Name", flex: 1, filterable: true },
      {
        field: "active",
        headerName: "Active",
        type: "boolean",
        width: 130,
        filterable: true,
      },
      {
        field: "payouts",
        headerName: "Payouts",
        width: 200,
        filterable: false,
        sortable: false,
        renderCell: renderPayouts,
      },
      {
        field: "landingPages",
        headerName: "Landing Pages",
        width: 250,
        filterable: true,
        renderCell: renderLandingPages,
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 250,
        filterable: false,
        sortable: false,
        renderCell: renderActions,
      },
    ],
    [],
  );

  const rows = useMemo(
    () =>
      data?.data.map((campaign: any) => ({
        id: campaign.id,
        campaignName: campaign.campaignName,
        active: campaign.active,
        adCreatives: campaign.adCreatives || [],
        campaignGoals: campaign.campaignGoals || [],
      })) || [],
    [data],
  );

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        filterMode="server"
        onFilterModelChange={onFilterChange}
        loading={isLoading}
        pagination
        autoPageSize
        showToolbar
        slots={{ toolbar: CampaignsTableToolbar }}
      />
    </div>
  );
};

export default CampaignsTable;
