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

		try {
			const orders = await Order.find({ createdAt: { $gte: today } })
				.limit(15)
				.sort({ createdAt: -1 })
				.populate("user", "name -_id")
				.populate("details.product", "name");

			return res.status(200).json({ success: true, orders });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Search order by keyword
	 * @route GET /orders/search
	 * @access admin
	 * @query keyword
	 */
	search: async (req, res) => {
		const { keyword } = req.query;

		try {
			const orders = await Order.find({
				$or: [
					{ "user.name": { $regex: keyword, $options: "i" } },
					{ "details.product.name": { $regex: keyword, $options: "i" } },
				],
			})
				.populate("user", "name -_id")
				.populate("details.product", "name");

			return res.status(200).json({ success: true, orders });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
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
		try {
			const order = await Order.findById(id)
				.populate("user", "name -_id")
				.populate("details.product", "name");
			if (!order) {
				return res
					.status(404)
					.json({ success: false, message: "Order not found" });
			}

			return res.status(200).json({ success: true, order });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
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

		// start session
		const session = await mongoose.startSession();

		try {
			// start transaction
			session.startTransaction();

			// calculate grand total
			const grandTotal = calculateGrandTotal(items);

			// create order
			const order = await Order.create(
				[
					{
						user: req.userId,
						details: items,
						grandTotal,
					},
				],
				{ session }
			);

			// update product stock
			await Product.bulkWrite(
				items.map((item) => ({
					updateOne: {
						filter: { _id: item.product },
						update: { $inc: { stock: item.quantity } },
					},
				})),
				{ new: true, session }
			);

			// create order report
			await OrderReport.create(
				[
					{
						order: order._id,
						user: req.userId,
						details: items,
						grandTotal,
					},
				],
				{ session }
			);

			// populating order
			const orderPopulated = await Order.findById(order[0]._id)
				.populate("user", "name -_id")
				.populate("details.product", "name")
				.session(session);

			await session.commitTransaction();
			return res.status(201).json({
				success: true,
				message: "Order created successfully",
				order: orderPopulated,
			});
		} catch (err) {
			await session.abortTransaction();
			return res.status(500).json({ success: false, message: err.message });
		} finally {
			session.endSession();
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update order status
	 * @route PUT /orders/:id
	 * @access admin
	 */
	update: async (req, res) => {
		const { quantity, productId, actions } = req.body;
		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const order = await Order.findById(req.params.id).session(session);
			if (!order) {
				return res.status(404).json({ message: "Order not found" });
			}

			const product = order.details.find((item) => item.product == productId);

			if (actions === "update") {
				await Product.findByIdAndUpdate(
					productId,
					{
						$inc: { stock: quantity - product.quantity },
					},
					{ new: true, session }
				);
			}

			if (actions === "remove") {
				await Product.findByIdAndUpdate(
					productId,
					{ $inc: { stock: -product.quantity } },
					{ new: true, session }
				);

				order.details = order.details.filter(
					(item) => item.product != productId
				);
			}

			product.quantity = quantity;

			const grandTotal = calculateGrandTotal(order.details);

			await Order.findByIdAndUpdate(
				req.params.id,
				{
					details: order.details,
					grandTotal,
				},
				{ new: true, session }
			);

			await OrderReport.findOneAndUpdate(
				{ order: req.params.id },
				{
					$set: {
						details: order.details,
						grandTotal,
						status: "updated",
					},
				},
				{ new: true, session }
			);

			const orderPopulated = await Order.findById(req.params.id)
				.populate("user", "name -_id")
				.populate("details.product", "name")
				.session(session);

			await session.commitTransaction();
			return res.status(200).json({
				success: true,
				message: "Order updated successfully",
				order: orderPopulated,
			});
		} catch (err) {
			await session.abortTransaction();
			return res.status(500).json({ success: false, message: err.message });
		} finally {
			session.endSession();
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete order
	 * @route DELETE /orders/:id
	 * @access admin
	 */
	destroy: async (req, res) => {
		const { id } = req.params;

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const order = await Order.findById(id).session(session);
			if (!order) {
				return res.status(404).json({ message: "Order not found" });
			}

			await Product.bulkWrite(
				order.details.map((item) => ({
					updateOne: {
						filter: { _id: item.product },
						update: { $inc: { stock: -item.quantity } },
					},
				})),
				{ new: true, session }
			);

			await OrderReport.findOneAndDelete({ order: id }, { session });
			await Order.findByIdAndDelete(id, { session });

			await session.commitTransaction();
			return res
				.status(200)
				.json({ success: true, message: "Order deleted successfully" });
		} catch (err) {
			await session.abortTransaction();
			return res.status(500).json({ success: false, message: err.message });
		} finally {
			session.endSession();
		}
	},
};

export default OrdersService;
