import User from "../schemas/users.schema.js";
import { keyName } from "../config/index.js";
import { verifyPassword } from "../helpers/password.helper.js";
import {
	generateAccessToken,
	generateRefreshToken,
} from "../helpers/token.helper.js";

const AuthController = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description login
	 * @access Public
	 */
	login: async (req, res) => {
		const { username, password } = req.body;
		if (!username || !password) {
			return res.status(400).send({ message: "Credential not valid" });
		}

		const user = await User.findOne({ username }).select("+password");
		if (!user) return res.status(404).send({ message: "User Not found." });

		const isPasswordMatch = verifyPassword(user.password);
		if (!isPasswordMatch) {
			return res.status(400).send({ message: "Credential not valid" });
		}

		const accessToken = generateAccessToken({ id: user._id });
		const refreshToken = generateRefreshToken({ id: user._id });

		if (req.cookies[String(keyName)]) req.cookies[String(keyName)] = "";

		await user
			.updateOne({ $push: { token: refreshToken } })
			.then((user) => {
				res.cookie(keyName, refreshToken, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				});

				return res.status(200).send({ token: accessToken, user: user.name });
			})
			.catch((error) => {
				return res.status(500).send({ message: error.message });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description logout
	 * @access Public
	 */
	logout: async (req, res) => {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).send({ message: "User Not found." });

		await user
			.updateOne({ $pull: { token: req.cookies[String(keyName)] } })
			.then(() => {
				res.clearCookie(keyName, {
					httpOnly: true,
					secure: true,
					sameSite: "none",
				});

				return res.status(200).json({ message: "Logout successfully" });
			});
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description refresh token
	 * @access Public
	 */
	refreshToken: async (req, res) => {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).send({ message: "User Not found." });

		const accessToken = generateAccessToken({ id: user._id });

		res.cookie(keyName, req.cookies[String(keyName)], {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		});

		return res.status(200).send({ token: accessToken });
	},

	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description get user info
	 * @access Public
	 */
	getAuth: async (req, res) => {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).send({ message: "User Not found." });

		return res.status(200).json(user);
	},
};

export default AuthController;
