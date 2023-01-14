import jwt from "jsonwebtoken";
import { accessTokenKey, refreshTokenKey } from "../config/index.js";

/**
 * @param {object} payload
 * @returns {string}
 * @description Generate access token
 * @access Public
 * @route POST /api/v1/login
 * @route POST /api/v1/refresh-token
 */

export const generateAccessToken = (payload) => {
	return jwt.sign(payload, accessTokenKey, { expiresIn: "10m" });
};

/**
 * @param {object} payload
 * @returns {string}
 * @description Generate refresh token
 * @access Public
 * @route POST /api/v1/login
 */
export const generateRefreshToken = (payload) => {
	return jwt.sign(payload, refreshTokenKey, { expiresIn: "7d" });
};
