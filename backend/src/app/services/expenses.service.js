import Expense from "../schemas/expenses.schema.js";

const ExpensesService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all expenses
	 * @route GET /expenses
	 * @access cashier
	 */
	index: async (req, res) => {
		const today = new Date().setHours(0, 0, 0, 0);

		try {
			const expenses = await Expense.find({ createdAt: { $gte: today } })
				.limit(15)
				.sort({ createdAt: -1 })
				.populate("user", "name -_id");

			return res.status(200).json({ success: true, expenses });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Show details of an expense
	 * @route GET /expenses/:id
	 * @access cashier
	 */
	show: async (req, res) => {
		const { id } = req.params;

		try {
			const expense = await Expense.findById(id).populate("user", "name -_id");

			return res.status(200).json({ success: true, expense });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create a new expense
	 * @route POST /expenses
	 * @access cashier
	 */
	store: async (req, res) => {
		const { type, amount, description } = req.body;
		const user = req.userId;
		try {
			const expense = await (
				await Expense.create({ type, user, amount, description })
			).populate("user", "name -_id");

			return res.status(201).json({ success: true, expense });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update an expense
	 * @route PUT /expenses/:id
	 * @access cashier
	 */
	update: async (req, res) => {
		const { id } = req.params;
		const { type, amount, description } = req.body;

		try {
			const expense = await Expense.findByIdAndUpdate(
				id,
				{ type, amount, description },
				{ new: true }
			).populate("user", "name -_id");

			return res.status(200).json({ success: true, expense });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete an expense
	 * @route DELETE /expenses/:id
	 * @access cashier
	 */
	destroy: async (req, res) => {
		const { id } = req.params;

		try {
			await Expense.findByIdAndDelete(id);

			return res
				.status(200)
				.json({ success: true, message: "Expense deleted" });
		} catch (error) {
			return res.status(500).json({ success: false, message: error.message });
		}
	},
};

export default ExpensesService;
