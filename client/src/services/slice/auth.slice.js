import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		isLogin: false,
		token: null,
		role: null,
		user: null,
	},
	reducers: {
		setCredentials: (state, action) => {
			state.isLogin = true;
			state.token = action.payload.token;
		},

		setAuthUser: (state, action) => {
			state.user = action.payload.name;
			state.role = action.payload.role;
		},

		refreshToken: (state, action) => {
			void (state.token = action.payload.token);
		},

		clearCredential: (state) => {
			state.isLogin = false;
			state.token = null;
			state.user = null;
			state.role = null;
		},
	},
});

export default authSlice.reducer;
export const { setCredentials, setAuthUser, refreshToken, clearCredential } =
	authSlice.actions;
