import mongoose from "mongoose";

const { Schema, model } = mongoose;

const OrdersSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		details: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				price: { type: Number, required: true },
				quantity: { type: Number, required: true },
			},
		],
		grandTotal: { type: Number, required: true },
		status: { type: String, required: true, default: "success" },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Order", OrdersSchema);
