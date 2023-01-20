import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state.persist);
	return auth.role === "admin" ? children : <Navigate to={"/"} />;
};
export const CashierRoutes = ({ children }) => {
	const { auth } = useSelector((state) => state.persist);
	return auth.role === "kasir" ? children : <Navigate to={"/"} />;
};
