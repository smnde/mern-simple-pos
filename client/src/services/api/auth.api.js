import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { customFetchBase } from "./customFetchBase";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: customFetchBase,
	tagTypes: ["Auth"],
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: "/login",
				method: "POST",
				body,
			}),
		}),

		getAuthUser: builder.query({
			query: () => ({ url: "/get-auth" }),
		}),

		refreshToken: builder.query({
			query: () => ({ url: "/refresh-token" }),
		}),

		logout: builder.query({
			query: () => ({ url: "/logout" }),
		}),
	}),
});

export const {
	useLoginMutation,
	useGetAuthUserQuery,
	useRefreshTokenQuery,
	useLogoutQuery,
} = authApi;
