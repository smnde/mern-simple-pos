import Product from "../schemas/products.schema.js";

const ProductsService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all products
	 * @route GET /api/v1/products
	 * @access Admin
	 * @access User
	 */
	index: async (req, res) => {
		try {
			const products = await Product.find({}).populate("category");

			return res.status(200).json({
				success: true,
				products,
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
	 * @description Get a product by id
	 * @route GET /api/v1/products/:id
	 * @access Admin
	 * @access User
	 */
	show: async (req, res) => {
		try {
			const product = await Product.findById(req.params.id).populate(
				"category"
			);

			if (!product) {
				return res.status(404).json({
					success: false,
					message: "Product not found",
				});
			}

			return res.status(200).json({
				success: true,
				product,
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
	 * @description Create a product
	 * @route POST /api/v1/products
	 * @access Admin
	 */
	store: async (req, res) => {
		try {
			const product = await Product.create(req.body);

			return res.status(201).json({
				success: true,
				product,
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
	 * @description Update a product
	 * @route PUT /api/v1/products/:id
	 * @access Admin
	 */
	update: async (req, res) => {
		try {
			const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
			});

			if (!product) {
				return res.status(404).json({
					success: false,
					message: "Product not found",
				});
			}

			return res.status(200).json({
				success: true,
				product,
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
	 * @description Delete a product
	 * @route DELETE /api/v1/products/:id
	 * @access Admin
	 */
	destroy: async (req, res) => {
		try {
			const product = await Product.findByIdAndDelete(req.params.id);

			if (!product) {
				return res.status(404).json({
					success: false,
					message: "Product not found",
				});
			}

			return res.status(200).json({
				success: true,
				message: "Product deleted successfully",
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},
};

export default ProductsService;
