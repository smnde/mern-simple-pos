import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicRoutes, PrivateRoutes } from "../middlewares/routes.middleware";
import { AdminRoutes, CashierRoutes } from "../middlewares/roles.middleware";
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
				<Route
					path="/login"
					element={
						<PublicRoutes>
							<Login />
						</PublicRoutes>
					}
				/>
				<Route path="*" element={<NotFound />} />

				<Route path="/" element={<MainLayout />}>
					<Route
						path="/"
						element={
							<PrivateRoutes>
								<h1>Dashboard</h1>
							</PrivateRoutes>
						}
					/>
					<Route
						path="/users"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<Users />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>
					<Route
						path="/categories"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<Categories />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>
					<Route
						path="/products"
						element={
							<PrivateRoutes>
								<Products />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/orders"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<Orders />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>
					<Route
						path="/sales"
						element={
							<PrivateRoutes>
								<Sales />
							</PrivateRoutes>
						}
					/>
					<Route
						path="/expenses"
						element={
							<PrivateRoutes>
								<CashierRoutes>
									<Exepenses />
								</CashierRoutes>
							</PrivateRoutes>
						}
					/>
					<Route
						path="/orders-report"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<OrderReports />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>
					<Route
						path="/sales-report"
						element={
							<PrivateRoutes>
							<AdminRoutes>
									<SalesReport />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>
					<Route
						path="/return-sales-report"
						element={
							<PrivateRoutes>
								<AdminRoutes>
									<ReturnSalesReport />
								</AdminRoutes>
							</PrivateRoutes>
						}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
