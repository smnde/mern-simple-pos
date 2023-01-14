import mongoose from "mongoose";
import Order from "../schemas/orders.schema.js";
import Product from "../schemas/products.schema.js";
import OrderReport from "../schemas/order-reports.schema.js";

const OrdersService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all orders
	 * @route GET /orders
	 * @access admin
	 */
	index: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);

		await Order.find({ createdAt: { $gte: today } })
			.limit(15)
			.sort({ createdAt: -1 })
			.populate("user -_id name")
			.populate("details.product -_id name")
			.then((orders) => {
				return res.status(200).json(orders);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	search: async (req, res) => {
		const { keyword } = req.query;

		await Order.find({ invoice: { $regex: query, $options: "i" } })
			.populate("user", "name -_id")
			.populate("details.product", "name")
			.then((order) => {
				return res.status(200).json(order);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get order details by id
	 * @route GET /orders
	 * @access admin
	 */
	show: async (req, res) => {
		const { id } = req.params;

		await Order.findById(id)
			.populate("user -_id name")
			.populate("details.product -_id name")
			.then((order) => {
				return res.status(200).json(order);
			})
			.catch((err) => {
				return res.status(500).json({ message: err.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create new order
	 * @route POST /orders
	 * @access admin
	 */
	store: async (req, res) => {
		const { items } = req.body;
		const session = await mongoose.startSession();
	},
};
