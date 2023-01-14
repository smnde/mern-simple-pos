import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ExpensesSchema = new Schema(
	{
		type: { type: String, required: true },
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		amount: { type: Number, required: true },
		description: { type: String, required: true },
		status: { type: String, default: "success" },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Expense", ExpensesSchema);
