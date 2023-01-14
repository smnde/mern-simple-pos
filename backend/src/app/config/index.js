import { config } from "dotenv";

config();

/**
 * @description Get environment variables
 * @access Public
 * @note Environment variables are stored in .env file
 * @note Environment variables are stored in process.env
 */

export const accessTokenKey = process.env.ACCESS_TOKEN_KEY;
export const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
export const port = process.env.PORT;
export const dbURI = process.env.DB_URI;
export const passwordKey = process.env.PASSWORD_KEY;
export const keyName = "ciOiJIUzI1NiIsInR5c";
