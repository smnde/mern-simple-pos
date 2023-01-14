import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UsersSchema = new Schema(
	{
		name: { type: String, required: true },
		username: { type: String, required: true, unique: true },
		role: { type: String, required: true },
		password: { type: String, required: true, select: false },
		token: { type: Array, default: [], select: false },
	},
	{ versionKey: false, timestamps: true }
);

export default model("User", UsersSchema);
