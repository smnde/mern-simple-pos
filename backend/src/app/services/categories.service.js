import Category from "../schemas/categories.schema.js";

const CategoriesService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all categories
	 * @route GET /api/v1/categories
	 * @access Admin
	 */
	index: async (req, res) => {
		try {
			const categories = await Category.find({}).populate("products");

			return res.status(200).json({
				success: true,
				categories,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get a category by id
	 * @route GET /api/v1/categories/:id
	 * @access Admin
	 */
	show: async (req, res) => {
		try {
			const category = await Category.findById(req.params.id).populate(
				"products"
			);

			if (!category) {
				return res.status(404).json({
					success: false,
					message: "Category not found",
				});
			}

			return res.status(200).json({
				success: true,
				category,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Create a category
	 * @route POST /api/v1/categories
	 * @access Admin
	 * @body {String} name
	 */
	store: async (req, res) => {
		try {
			const category = await Category.create(req.body);

			return res.status(201).json({
				success: true,
				category,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Update a category by id
	 * @route PUT /api/v1/categories/:id
	 * @access Admin
	 * @body {String} name
	 */
	update: async (req, res) => {
		try {
			const category = await Category.findByIdAndUpdate(
				req.params.id,
				req.body,
				{ new: true }
			);

			if (!category) {
				return res.status(404).json({
					success: false,
					message: "Category not found",
				});
			}

			return res.status(200).json({
				success: true,
				category,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Delete a category by id
	 * @route DELETE /api/v1/categories/:id
	 * @access Admin
	 */
	destroy: async (req, res) => {
		try {
			const category = await Category.findByIdAndDelete(req.params.id);

			if (!category) {
				return res.status(404).json({
					success: false,
					message: "Category not found",
				});
			}

			return res.status(200).json({
				success: true,
				message: "Category deleted successfully",
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},
};

export default CategoriesService;
