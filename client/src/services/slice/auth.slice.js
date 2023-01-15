import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLogin: false,
		token: null,
	},
	reducers: {
		setCredentials: (state, action) => {
			state.isLogin = true;
			state.token = action.payload.token;
		},

		refreshToken: (state, action) => {
			void (state.token = action.payload);
		},

		logout: (state) => {
			state.token = null;
			state.isLogin = false;
		},
	},
});

export default authSlice.reducer;
export const { setCredentials, refreshToken, logout } = authSlice.actions;
