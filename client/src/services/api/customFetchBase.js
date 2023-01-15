import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { logout, refreshToken } from "../slice/auth.slice";
import { Mutex } from "async-mutex";

const baseURL = "http://localhost:5000/api/v1";
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
	baseUrl: baseURL,
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) headers.set("Authorization", `Bearer ${token}`);
		return headers;
	},
});

export const customFetchBase = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);

	// if unauthorized, cookies expired or deleted
	if (result.error && result.error.status === 401) {
		api.dispatch(logout());
		result = await baseQuery(args, api, extraOptions);
	}

	if (result.error && result.error.status === 405) {
		if (!mutex.isLocked) {
			const release = await mutex.acquire();
			try {
				const refreshResult = await baseQuery(
					"refresh-token",
					api,
					extraOptions
				);

				if (refreshResult.data) {
					api.dispatch(refreshToken(refreshResult.data));
					result = await baseQuery(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(args, api, extraOptions);
		}
	}

	return result;
};
