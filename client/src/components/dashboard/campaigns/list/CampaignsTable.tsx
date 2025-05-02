"use client";

import type { FC } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DataGrid, GridColDef, GridFilterModel } from "@mui/x-data-grid";
import { useGetCampaignsQuery } from "@/lib/redux/api/campaignsApi";
import CampaignsTableToolbar from "@/components/dashboard/campaigns/list/CampaignsTableToolbar";

const CampaignsTable: FC = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
    sortBy: ["createdAt:DESC"],
    filter: {},
  });
  const { data, isLoading } = useGetCampaignsQuery(queryParams);

  useEffect(() => {
    console.log("table data", data);
  }, [data]);

  const onFilterChange = useCallback((filterModel: GridFilterModel) => {
    const filter: Record<string, any> = {};

    if (filterModel.items && filterModel.items.length > 0) {
      for (const item of filterModel.items) {
        if (item.field === "campaignName") {
          filter.campaignName = item.value;
        } else if (item.field === "active" && item.value !== undefined) {
          filter.active = item.value;
        } else if (item.field === "adCreativeUrl") {
          filter.adCreativeUrl = item.value;
        }
      }
    }

    setQueryParams((prev) => ({
      ...prev,
      filter,
    }));
  }, []);

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
        field: "startDate",
        headerName: "Start Date",
        type: "date",
        width: 130,
        filterable: false,
      },
      {
        field: "endDate",
        headerName: "End Date",
        type: "date",
        width: 130,
        filterable: false,
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
        startDate: new Date(campaign.campaignScheduling[0].start),
        endDate: new Date(campaign.campaignScheduling[0].end),
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
