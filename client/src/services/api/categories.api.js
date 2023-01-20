import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const categoriesApi = createApi({
	reducerPath: "categoriesApi",
	baseQuery: customFetchBase,
	tagTypes: ["Categories"],
	endpoints: (builder) => ({
		getCategories: builder.query({
			query: () => ({ url: "/categories" }),
			providesTags: ["Categories"],
		}),

		showCategory: builder.query({
			query: (id) => ({ url: `/categories/${id}` }),
		}),

		createCategory: builder.mutation({
			query: (body) => ({ url: `/categories`, method: "POST", body }),
			invalidatesTags: ["Categories"],
		}),

		updateCategory: builder.mutation({
			query: (body) => ({ url: `/categories/${body.id}`, method: "PUT", body }),
			invalidatesTags: ["Categories"],
		}),

		deleteCategory: builder.mutation({
			query: (id) => ({ url: `/categories/${id}`, method: "DELETE	" }),
			invalidatesTags: ["Categories"],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useShowCategoryQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoriesApi;
