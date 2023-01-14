import CryptoJS from "crypto-js";
import { passwordKey } from "../config/index.js";

/**
 * @param {string} password
 * @returns {string}
 * @description Encrypt password
 * @access Public
 * @route POST /api/v1/login
 */
export const encryptPassword = (password) => {
	return CryptoJS.AES.encrypt(password, passwordKey).toString();
};

/**
 * @param {string} encryptedPassword
 * @returns {boolean}
 * @description Verify password
 * @access Public
 */
export const verifyPassword = (encryptedPassword) => {
	return CryptoJS.AES.decrypt(encryptedPassword, passwordKey).toString(
		CryptoJS.enc.Utf8
	);
};
