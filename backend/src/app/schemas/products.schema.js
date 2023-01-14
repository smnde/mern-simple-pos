import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductsSchema = new Schema(
	{
		name: { type: String, required: true, lowercase: true },
		category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
		purchasePrice: { type: Number, required: true },
		salesPrice: { type: Number, required: true },
		stock: { type: Number, required: true, default: 0 },
	},
	{ versionKey: false, timestamps: true }
);

export default model("Product", ProductsSchema);
