import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
	reducerPath: "dashboardApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
	endpoints: (builder) => ({
		getDashboard: builder.query({
			query: () => "/dashboard",
		}),
	}),
});

export const { useGetDashboardQuery } = dashboardApi;
