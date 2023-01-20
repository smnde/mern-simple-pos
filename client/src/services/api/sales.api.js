import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const salesApi = createApi({
	reducerPath: "salesApi",
	baseQuery: customFetchBase,
	tagTypes: ["Sales"],
	endpoints: (builder) => ({
		getSales: builder.query({
			query: () => ({ url: "/sales" }),
			providesTags: ["Sales"],
		}),

		showSales: builder.query({
			query: (id) => ({ url: `/sales/${id}` }),
		}),

		createSales: builder.mutation({
			query: (body) => ({ url: `/sales`, method: "POST", body }),
			invalidatesTags: ["Sales"],
		}),

		updateSales: builder.mutation({
			query: (body) => ({ url: `/sales/${body.id}`, method: "PUT", body }),
			invalidatesTags: ["Sales"],
		}),

		deleteSales: builder.mutation({
			query: (id) => ({ url: `/sales/${id}`, method: "DELETE" }),
			invalidatesTags: ["Sales"],
		}),
	}),
});

export const {
	useGetSalesQuery,
	useShowSalesQuery,
	useCreateSalesMutation,
	useUpdateSalesMutation,
	useDeleteSalesMutation,
} = salesApi;
