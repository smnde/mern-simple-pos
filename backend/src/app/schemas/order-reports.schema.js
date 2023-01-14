import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrderReportsSchema = new Schema(
	{
		order: { type: Schema.Types.ObjectId, ref: "Order" },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		details: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				qty: { type: Number },
				price: { type: Number },
				total: { type: Number },
			},
		],
		grandTotal: { type: Number },
		status: { type: String, default: "success" },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("OrderReport", OrderReportsSchema);
