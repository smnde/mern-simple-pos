import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// if auth is login, redirect to /. forbidden user access public routes if user is login
export const PublicRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state.persist);
	return auth.isLogin && auth.token ? <Navigate to="/" /> : children;
};

// if user is login, keep user in the page, if not, redirect to /login
export const PrivateRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state.persist);
	return auth.isLogin && auth.token ? children : <Navigate to="/login" />;
};
