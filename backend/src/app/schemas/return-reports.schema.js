import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ReturnReportSchema = new Schema(
	{
		sales: { type: Schema.Types.ObjectId, ref: "Sales" },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		details: [
			{
				_id: false,
				product: { type: Schema.Types.ObjectId, ref: "Product" },
				returnedQty: { type: Number },
				price: { type: Number },
				total: { type: Number },
				returnReason: { type: [] },
			},
		],
		buyDate: { type: Date },
		returnedDate: { type: Date, default: Date.now },
	},
	{
		versionKey: false,
	}
);

export default model("ReturnReport", ReturnReportSchema);
