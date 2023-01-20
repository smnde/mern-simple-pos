import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { dashboardApi } from "../api/dashboard.api";
import { categoriesApi } from "../api/categories.api";
import { productsApi } from "../api/products.api";
import { ordersApi } from "../api/orders.api";
import { salesApi } from "../api/sales.api";
import { expensesApi } from "../api/expenses.api";
import { reportsApi } from "../api/reports.api";
import chartReducer from "../slice/chart.slice";
import authReducer from "../slice/auth.slice";
import ordersCartReducer from "../slice/orders-cart.slice";
import salesCartReducer from "../slice/sales-cart.slice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import {
	FLUSH,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
	REHYDRATE,
} from "redux-persist";
import { authApi } from "../api/auth.api";
import { usersApi } from "../api/users.api";

const encryptor = encryptTransform({
	secretKey: "secret-banget",
	onError: () => console.log("error encrypting"),
});

const persistConfig = {
	key: "root",
	version: 1,
	storage,
	whitelist: ["auth", "ordersCart", "salesCart"],
	transforms: [encryptor],
	debug: false,
};

const rootReducer = combineReducers({
	auth: authReducer,
	ordersCart: ordersCartReducer,
	salesCart: salesCartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		[usersApi.reducerPath]: usersApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,
		[salesApi.reducerPath]: salesApi.reducer,
		[expensesApi.reducerPath]: expensesApi.reducer,
		[reportsApi.reducerPath]: reportsApi.reducer,
		persist: persistedReducer,
		chart: chartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(
			authApi.middleware,
			dashboardApi.middleware,
			usersApi.middleware,
			categoriesApi.middleware,
			productsApi.middleware,
			ordersApi.middleware,
			salesApi.middleware,
			expensesApi.middleware,
			reportsApi.middleware
		),
	devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
