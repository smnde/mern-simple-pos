import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Navbar";

export default function MainLayout() {
	return (
		<>
			<Nav />
			<Outlet />
		</>
	);
}
