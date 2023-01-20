import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const expensesApi = createApi({
	reducerPath: "expensesApi",
	baseQuery: customFetchBase,
	tagTypes: ["Expenses"],
	endpoints: (builder) => ({
		getExpenses: builder.query({
			query: () => ({ url: "expenses" }),
			providesTags: ["Expenses"],
		}),

		showExpense: builder.query({
			query: (id) => ({ url: `expenses/${id}` }),
		}),

		createExpense: builder.mutation({
			query: (body) => ({ url: `expenses`, method: "POST", body }),
			invalidatesTags: ["Expenses"],
		}),

		updateExpense: builder.mutation({
			query: (body) => ({ url: `expenses/${body.id}`, method: "PUT", body }),
			invalidatesTags: ["Expenses"],
		}),

		deleteExpense: builder.mutation({
			query: (id) => ({ url: `expenses/${id}`, method: "DELETE" }),
			invalidatesTags: ["Expenses"],
		}),
	}),
});

export const {
	useGetExpensesQuery,
	useShowExpenseQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
} = expensesApi;
