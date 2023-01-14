import { isLogin } from "./auth.middleware.js";

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 * @description check role admin
 */
export const isAdmin = async (req, res, next) => {
	await isLogin(req, res, async () => {
		if (req.user.role !== "admin") {
			return res.status(403).send({ message: "You're not allowed" });
		}
		next();
	});
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<Response>}
 * @description check role kasir
 */
export const isCashier = async (req, res, next) => {
	await isLogin(req, res, async () => {
		if (req.user.role !== "kasir") {
			return res.status(403).send({ message: "You're not allowed" });
		}
		next();
	});
};
