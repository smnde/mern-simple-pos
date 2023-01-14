import express from "express";
import AuthService from "../services/auth.service.js";
import UsersService from "../services/users.service.js";
import CategoriesService from "../services/categories.service.js";
import ProductsService from "../services/products.service.js";
import OrdersService from "../services/orders.service.js";
import { isLogin } from "../middlewares/auth.middleware.js";
import { isAdmin, isCashier } from "../middlewares/role.middleware.js";

const route = express.Router();

route.post("/login", AuthService.login);
route.get("/logout", AuthService.logout);
route.get("/refresh-token", AuthService.refreshToken);

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

export default route;
