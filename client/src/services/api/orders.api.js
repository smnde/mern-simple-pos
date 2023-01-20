import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const ordersApi = createApi({
	reducerPath: "ordersApi",
	baseQuery: customFetchBase,
	tagTypes: ["Orders"],
	endpoints: (builder) => ({
		getOrders: builder.query({
			query: () => ({ url: "/orders" }),
			providesTags: ["Orders"],
		}),

		showOrder: builder.query({
			query: (id) => ({ url: `/orders/${id}` }),
		}),

		createOrder: builder.mutation({
			query: (body) => ({ url: `/orders`, method: "POST", body }),
			invalidatesTags: ["Orders"],
		}),

		updateOrder: builder.mutation({
			query: (body) => ({ url: `/orders/${body.id}`, method: "PUT", body }),
			invalidatesTags: ["Orders"],
		}),

		deleteOrder: builder.mutation({
			query: (id) => ({ url: `/orders/${id}`, method: "DELETE" }),
			invalidatesTags: ["Orders"],
		}),
	}),
});

export const {
	useGetOrdersQuery,
	useShowOrderQuery,
	useCreateOrderMutation,
	useUpdateOrderMutation,
	useDeleteOrderMutation,
} = ordersApi;
