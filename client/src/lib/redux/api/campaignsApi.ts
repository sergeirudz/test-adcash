import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { config } from "@/config";

export interface CampaignsQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string[];
  search?: string;
  filter?: {
    campaignName?: string;
    active?: boolean;
    adCreativeUrl?: string;
  };
}

export interface Campaign {
  id: number;
  campaignName: string;
  active: boolean;
  createdAt: string;
  adCreatives: Array<{ url: string; [key: string]: any }>;

  [key: string]: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: Record<string, string>;
    searchBy: string[];
    search: string;
    filter?: Record<string, any>;
  };
  links: {
    first: string;
    previous: string;
    current: string;
    next: string;
    last: string;
  };
}

export const campaignsApi = createApi({
  reducerPath: "campaignsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${config.server.url}/${config.server.version}/campaigns`,
  }),
  tagTypes: ["getCampaigns"],
  endpoints: (build) => ({
    createCampaign: build.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["getCampaigns"],
    }),

    getCampaigns: build.query<
      PaginatedResponse<Campaign>,
      CampaignsQueryParams
    >({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();

        if (params.page) queryParams.append("page", params.page.toString());
        if (params.limit) queryParams.append("limit", params.limit.toString());

        if (params.sortBy) {
          params.sortBy.forEach((sort) => queryParams.append("sortBy", sort));
        }

        if (params.search) queryParams.append("search", params.search);

        if (params.filter) {
          if (params.filter.campaignName) {
            queryParams.append(
              "filter.campaignName",
              `$ilike:${params.filter.campaignName}`,
            );
          }

          if (params.filter.active !== undefined) {
            queryParams.append(
              "filter.active",
              params.filter.active.toString(),
            );
          }

          if (params.filter.adCreativeUrl) {
            queryParams.append(
              "filter.adCreativeUrl",
              params.filter.adCreativeUrl,
            );
          }
        }

        return {
          url: `/?${queryParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["getCampaigns"],
    }),

    deleteCampaignById: build.mutation<void, string | number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["getCampaigns"],
    }),

    toggleCampaign: build.mutation<void, string | number>({
      query: (id) => ({
        url: `/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["getCampaigns"],
    }),
  }),
});

export const {
  useCreateCampaignMutation,
  useGetCampaignsQuery,
  useDeleteCampaignByIdMutation,
  useToggleCampaignMutation,
} = campaignsApi;
