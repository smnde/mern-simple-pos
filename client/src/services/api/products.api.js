import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const productsApi = createApi({
	reducerPath: "productsAPi",
	baseQuery: customFetchBase,
	tagTypes: ["Products"],
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: () => ({ url: "/products" }),
			providesTags: ["Products"],
		}),

		showProduct: builder.query({
			query: (id) => ({ url: `/products/${id}` }),
		}),

		createProduct: builder.mutation({
			query: (body) => ({ url: `/products`, method: "POST", body }),
			invalidatesTags: ["Products"],
		}),

		updateProduct: builder.mutation({
			query: (body) => ({ url: `/products/${body.id}`, method: "PUT", body }),
			invalidatesTags: ["Products"],
		}),

		deleteProduct: builder.mutation({
			query: (id) => ({ url: `products/${id}`, method: "DELETE" }),
			invalidatesTags: ["Products"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useShowProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApi;
