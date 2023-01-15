import React, { useEffect } from "react";
import Router from "./routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetAuthUserQuery } from "./services/api/auth.api";
import { setAuthUser } from "./services/slice/auth.slice";

export default function App() {
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state);
	const [getAuthUser] = useLazyGetAuthUserQuery();

	useEffect(() => {
		if (auth.isLogin) {
			getAuthUser().then(({ data }) => {
				dispatch(setAuthUser(data));
			});
		}
	}, [auth.isLogin, getAuthUser, dispatch]);

	return <Router />;
}
