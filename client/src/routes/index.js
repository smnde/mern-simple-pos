import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/login";
import Users from "../pages/users";
import Categories from "../pages/categories";
import Products from "../pages/products";
import Orders from "../pages/orders";
import Sales from "../pages/sales";
import Exepenses from "../pages/expenses";
import SalesReport from "../pages/reports/sales-report";
import OrderReports from "../pages/reports/order-reports";
import ReturnSalesReport from "../pages/reports/return-sales-report";
import NotFound from "../pages/errors/404";

export default function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<NotFound />} />

				<Route path="/" element={<MainLayout />}>
					<Route path="/" element={<h1>Dashboard</h1>} />
					<Route path="/users" element={<Users />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/products" element={<Products />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/sales" element={<Sales />} />
					<Route path="/expenses" element={<Exepenses />} />
					<Route path="/orders-report" element={<OrderReports />} />
					<Route path="/sales-report" element={<SalesReport />} />
					<Route path="/return-sales-report" element={<ReturnSalesReport />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
