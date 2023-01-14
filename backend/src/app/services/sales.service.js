import mongoose from "mongoose";
import Sales from "../schemas/sales.schemas.js";
import SalesReport from "../schemas/sales-reports.schema.js";
import ReturnReport from "../schemas/return-reports.schema.js";
import Product from "../schemas/products.schema.js";
import {
	calculateGrandTotal,
	calculateProfit,
} from "../helpers/transactions.helper.js";

const SalesService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all sales
	 * @route GET /api/v1/sales
	 * @access Public
	 */
	index: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);
		try {
			const sales = await Sales.find({
				createdAt: { $gte: today },
			})
				.limit(15)
				.sort({ createdAt: -1 })
				.populate("user", "name -_id")
				.populate("details", "name -_id");

			return res.status(200).json({ success: true, sales });
		} catch (error) {
			return res.status(500).json({ success: false, error: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Search sales
	 * @route GET /api/v1/sales
	 * @access Public
	 * @query keyword
	 */
	search: async (req, res) => {
		const { keyword } = req.query;
		try {
			const sales = await Sales.find({
				$or: [
					{ "user.name": { $regex: keyword, $options: "i" } },
					{ "product.name": { $regex: keyword, $options: "i" } },
				],
			})
				.populate("user", "name -_id")
				.populate("details", "name -_id");

			return res.status(200).json({ success: true, sales });
		} catch (error) {
			return res.status(500).json({ success: false, error: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get sales details by id
	 * @route GET /api/v1/sales/:id
	 * @access Public
	 */
	show: async (req, res) => {
		const { id } = req.params;
		try {
			const sale = await Sales.findById(id)
				.populate("user", "name -_id")
				.populate("details", "name -_id");

			return res.status(200).json({ success: true, sale });
		} catch (error) {
			return res.status(500).json({ success: false, error: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create new sale
	 * @route POST /api/v1/sales
	 * @access Cashier
	 */
	store: async (req, res) => {
		const { items } = req.body;

		const session = await mongoose.startSession();

		try {
			session.startTransaction();

			const grandTotal = calculateGrandTotal(items);
			const totalProfit = calculateProfit(items);

			const sales = await Sales.create(
				[
					{
						user: req.userId,
						details: items,
						grandTotal,
						totalProfit,
					},
				],
				{ session }
			);

			await Product.bulkWrite(
				items.map((item) => ({
					updateOne: {
						filter: { _id: item.product },
						update: { $inc: { stock: -item.quantity } },
					},
				})),
				{ new: true, session }
			);

			await SalesReport.create(
				[
					{
						sales: sales[0]._id,
						user: req.userId,
						details: items,
						grandTotal,
						totalProfit,
					},
				],
				{ session }
			);

			const salesPopulated = await Sales.findById(sales[0]._id)
				.populate("user", "name -_id")
				.populate("details", "name -_id")
				.session(session);

			await session.commitTransaction();
			return res.status(201).json({
				success: true,
				message: "Sales created",
				sales: salesPopulated,
			});
		} catch (error) {
			await session.abortTransaction();
			return res.status(500).json({ success: false, error: error.message });
		} finally {
			session.endSession();
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update sale
	 * @route PUT /api/v1/sales/:id
	 * @access Cashier
	 */
	returnItem: async (req, res) => {
		const { productId, price, cost, returnedQty, returnReason } = req.body;
		const session = await mongoose.startSession();

		const returnedItem = [
			{
				product: productId,
				price,
				returnedQty,
				total: price * returnedQty,
				returnReason,
			},
		];

		try {
			session.startTransaction();

			const sales = await Sales.findById(req.params.id);
			if (!sales)
				return res
					.status(404)
					.json({ success: false, message: "Sale not found" });

			const product = sales.details.find((item) => item.product == productId);

			if (!returnReason.includes("broken")) {
				await Product.findByIdAndUpdate(
					productId,
					{
						$inc: { stock: returnedQty },
					},
					{ new: true, session }
				);
			}

			const returnedTotal = product.price * returnedQty;
			const returnedProfit = (product.price - cost) * returnedQty;

			await Sales.findByIdAndUpdate(
				req.params.id,
				{
					$inc: {
						grandTotal: -returnedTotal,
						totalProfit: -returnedProfit,
						[`details.$[product].quantity`]: -returnedQty,
					},
				},
				{
					new: true,
					arrayFilters: [{ "product.product": productId }],
					session,
				}
			);

			if (product.quantity === returnedQty) {
				const removedItem = await Sales.findByIdAndUpdate(
					req.params.id,
					{
						$pull: {
							details: { product: productId },
						},
					},
					{ new: true, session }
				);

				if (removedItem.details.length === 0) {
					await Sales.findByIdAndUpdate(
						req.params.id,
						{
							$set: { status: "returned" },
						},
						{ new: true, session }
					);
				}
			}

			await ReturnReport.findOneAndUpdate(
				{ sales: req.params.id },
				{
					user: req.userId,
					sales: req.params.id,
					$push: { details: returnedItem },
					$inc: { grandTotal: returnedTotal, totalProfit: returnedProfit },
					buyDate: sales.createdAt,
				},
				{ upsert: true, new: true, session }
			);

			const salesPopulated = await Sales.findById(req.params.id)
				.populate("user", "name -_id")
				.populate("details", "name -_id")
				.session(session);

			await session.commitTransaction();
			return res.status(200).json({
				success: true,
				message: "Item returned",
				sales: salesPopulated,
			});
		} catch (error) {
			await session.abortTransaction();
			return res.status(500).json({ success: false, error: error.message });
		} finally {
			session.endSession();
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete sale
	 * @route DELETE /api/v1/sales/:id
	 * @access Cashier
	 */
	destroy: async (req, res) => {
		const sales = await Sales.findById(req.params.id);
		if (sales && sales.status === "returned") {
			await Sales.findByIdAndDelete(req.params.id);
			return res.status(200).json({
				success: true,
				message: "Sales deleted",
			});
		}

		return res.status(500).json({
			success: false,
			message: "Sales not found or not returned",
		});
	},
};

export default SalesService;
