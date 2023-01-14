import mongoose from "mongoose";

const { Schema, model } = mongoose;

const SalesSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		details: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
			},
		],
		grandTotal: { type: Number, required: true },
		totalProfit: { type: Number, required: true },
		status: { type: String, required: true, default: "sold" },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Sales", SalesSchema);
