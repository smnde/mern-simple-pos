import { createApi } from "@reduxjs/toolkit/query/react";
import { customFetchBase } from "./customFetchBase";

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: customFetchBase,
	tagTypes: ["Users"],
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => ({ url: "/users" }),
			providesTags: ["Users"],
		}),

		showUser: builder.query({
			query: (id) => ({ url: `/users/${id}` }),
		}),

		createUser: builder.mutation({
			query: (body) => ({ url: `/users`, method: "POST", body }),
			invalidatesTags: ["Users"],
		}),

		updateUser: builder.mutation({
			query: (body) => ({ url: `/users/${body.id}`, method: "PUT", body }),
			invalidatesTags: ["Users"],
		}),

		deleteUser: builder.mutation({
			query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
			invalidatesTags: ["Users"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useLazyShowUserQuery,
	useCreateUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = usersApi;
