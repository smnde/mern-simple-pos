import mongoose from "mongoose";

const { Schema, model } = mongoose;

const CategoriesSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
	},
	{ versionKey: false, timestamps: true }
);

export default model("Category", CategoriesSchema);
