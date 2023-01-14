import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey, keyName } from "../config/index.js";
import User from "../schemas/users.schema.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 * @description Verify access token
 * @access Public
 */
export const verifyAccessToken = (req, res, next) => {
	const accessToken = req.headers.authorization?.split(" ")[1];
	if (!accessToken) {
		return res.status(405).json({
			success: false,
			message: "Invalid token",
		});
	}

	jwt.verify(accessToken, accessTokenKey, (err, decoded) => {
		if (err) {
			return res.status(405).json({
				success: false,
				message: "Invalid token",
			});
		}

		req.userId = decoded.id;
		next();
	});
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 * @description Verify refresh token
 * @access Public
 */
export const verifyRefreshToken = (req, res, next) => {
	const refreshToken = req.cookies[String(keyName)];

	if (!refreshToken) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized",
		});
	}

	jwt.verify(refreshToken, refreshTokenKey, async (err, decoded) => {
		if (err) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
			});
		}

		const user = await User.findById(decoded.id).select("+token");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
			});
		}

		const validToken = user.token.find((token) => token === refreshToken);

		if (!validToken) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized",
			});
		}

		req.userId = user._id;
		next();
	});
};
