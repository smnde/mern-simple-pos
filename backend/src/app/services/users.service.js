import User from "../schemas/users.schema.js";
import { encryptPassword } from "../helpers/password.helper.js";

const UsersService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get all users
	 * @route GET /api/v1/users
	 * @access Admin
	 */
	index: async (req, res) => {
		try {
			const users = await User.find({}).limit(15).sort({ role: 1 });
			return res.status(200).json({
				success: true,
				users,
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
	 * @description Get a user by id
	 * @route GET /api/v1/users/:id
	 * @access Admin
	 */
	show: async (req, res) => {
		try {
			const user = await User.findById(req.params.id);

			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			return res.status(200).json({
				success: true,
				user,
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
	 * @description Create a user
	 * @route POST /api/v1/users
	 * @access Admin
	 */
	store: async (req, res) => {
		const { name, username, role, password } = req.body;
		try {
			const user = await User.findOne({ username });
			if (user) {
				return res.status(400).json({
					success: false,
					message: "Username already exists",
				});
			}

			const newUser = new User({
				name,
				username,
				role,
				password: encryptPassword(password),
			});

			await newUser.save().then((user) => {
				const { password, ...data } = user._doc;

				return res.status(201).json({
					success: true,
					user: data,
				});
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
	 * @description Update a user by id
	 * @route PUT /api/v1/users/:id
	 * @access Admin
	 */
	update: async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});

			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			return res.status(200).json({ success: true, user });
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
	 * @description Delete a user by id
	 * @route DELETE /api/v1/users/:id
	 * @access Admin
	 */
	destroy: async (req, res) => {
		try {
			const user = await User.findByIdAndDelete(req.params.id);

			if (!user) {
				return res.status(404).json({
					success: false,
					message: "User not found",
				});
			}

			return res
				.status(200)
				.json({ success: true, message: "User deleted successfully" });
		} catch (error) {
			return res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	},
};

export default UsersService;
