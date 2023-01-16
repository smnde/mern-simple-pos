import { configureStore } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { dashboardApi } from "../api/dashboard.api";
import chartReducer from "../slice/chart.slice";
import authReducer from "../slice/auth.slice";
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

const encryptor = encryptTransform({
	secretKey: "secret-banget",
	onError: () => console.log("error encrypting"),
});

const persistConfig = {
	key: "auth",
	version: 1,
	storage,
	transforms: [encryptor],
	whitelist: ["token", "isLogin"],
	debug: false,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		[authApi.reducerPath]: authApi.reducer,
		[dashboardApi.reducerPath]: dashboardApi.reducer,
		auth: persistedReducer,
		chart: chartReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(authApi.middleware, dashboardApi.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
