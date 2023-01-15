import React from "react";
import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav";

export default function MainLayout() {
	return (
		<>
			<Sidenav />
			<Outlet />
		</>
	);
}
