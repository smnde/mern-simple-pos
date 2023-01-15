import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { dashboardApi } from "../api/dashboard.api";
import chartReducer from "../slice/chart.slice";

export const store = configureStore({
	reducer: {
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		chart: chartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(dashboardApi.middleware),
});

setupListeners(store.dispatch);
