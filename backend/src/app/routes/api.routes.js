import express from "express";
import AuthService from "../services/auth.service.js";
import UsersService from "../services/users.service.js";
import CategoriesService from "../services/categories.service.js";
import ProductsService from "../services/products.service.js";
import OrdersService from "../services/orders.service.js";
import SalesService from "../services/sales.service.js";
import DashboardService from "../services/dashboard.service.js";
import ExpensesService from "../services/expenses.service.js";
import { isLogin } from "../middlewares/auth.middleware.js";
import { isAdmin, isCashier } from "../middlewares/role.middleware.js";
import { verifyRefreshToken } from "../middlewares/token.middleware.js";

const route = express.Router();

route.post("/login", AuthService.login);
route.get("/get-auth", isLogin, AuthService.getAuth);
route.get("/logout", verifyRefreshToken, AuthService.logout);
route.get("/refresh-token", verifyRefreshToken, AuthService.refreshToken);

route.get("/dashboard", isLogin, DashboardService.index);

route.get("/users", isAdmin, UsersService.index);
route.get("/users/:id", isAdmin, UsersService.show);
route.post("/users", isAdmin, UsersService.store);
route.put("/users/:id", isAdmin, UsersService.update);
route.delete("/users/:id", isAdmin, UsersService.destroy);

route.get("/categories", isAdmin, CategoriesService.index);
route.get("/categories/:id", isAdmin, CategoriesService.show);
route.post("/categories", isAdmin, CategoriesService.store);
route.put("/categories/:id", isAdmin, CategoriesService.update);
route.delete("/categories/:id", isAdmin, CategoriesService.destroy);

route.get("/products", isLogin, ProductsService.index);
route.get("/products/:id", isLogin, ProductsService.show);
route.post("/products", isAdmin, ProductsService.store);
route.put("/products/:id", isAdmin, ProductsService.update);
route.delete("/products/:id", isAdmin, ProductsService.destroy);

route.get("/orders", isAdmin, OrdersService.index);
route.get("/orders/:id", isAdmin, OrdersService.show);
route.post("/orders", isAdmin, isAdmin, OrdersService.store);
route.put("/orders/:id", isAdmin, OrdersService.update);
route.delete("/orders/:id", isAdmin, OrdersService.destroy);

route.get("/sales", isLogin, SalesService.index);
route.get("/sales/:id", isLogin, SalesService.show);
route.post("/sales", isCashier, SalesService.store);
route.put("/return-sales/:id", isCashier, SalesService.returnItem);
route.delete("/sales/:id", isCashier, SalesService.destroy);

route.get("/expenses", isCashier, ExpensesService.index);
route.get("/expenses/:id", isCashier, ExpensesService.show);
route.post("/expenses", isCashier, ExpensesService.store);
route.put("/expenses/:id", isCashier, ExpensesService.update);
route.delete("/expenses/:id", isCashier, ExpensesService.destroy);

export default route;
