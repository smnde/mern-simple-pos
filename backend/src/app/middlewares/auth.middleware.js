import { verifyAccessToken, verifyRefreshToken } from "./token.middleware.js";
import User from "../schemas/users.schema.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 * @description check login status
 * @access Public
 */
export const isLogin = async (req, res, next) => {
	await verifyRefreshToken(req, res, async () => {
		const user = await User.findById(req.userId);
		if (!user) return res.status(404).send({ message: "User Not found." });

		await verifyAccessToken(req, res, async () => {
			const user = await User.findById(req.userId);
			if (!user) return res.status(404).send({ message: "User Not found." });

			req.user = user;	
			next();
		});
	});
};
