import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const reportsApi = createApi({
	reducerPath: "reportsApi",
	baseQuery: customFetchBase,
	tagTypes: ["Reports"],
	endpoints: (builder) => ({
		getOrdersReport: builder.query({
			query: () => ({ url: "/orders-report" }),
		}),

		getSalesReport: builder.query({
			query: () => ({ url: "/sales-report" }),
		}),

		getReturnSalesReport: builder.query({
			query: () => ({ url: "return-sales-report" }),
		}),
	}),
});

export const {
	useGetOrdersReportQuery,
	useGetSalesReportQuery,
	useGetReturnSalesReportQuery,
} = reportsApi;
