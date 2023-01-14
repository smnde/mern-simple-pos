import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SalesReportsSchema = new Schema(
	{
		sales: { type: Schema.Types.ObjectId, ref: "Selling" },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		details: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				qty: { type: Number },
				purchasePrice: { type: Number },
				price: { type: Number },
				total: { type: Number },
				profit: { type: Number },
			},
		],
		grandTotal: { type: Number },
		totalProfit: { type: Number },
		description: { type: String },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("SalesReport", SalesReportsSchema);
