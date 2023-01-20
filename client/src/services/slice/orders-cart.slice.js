import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const ordersCartSlice = createSlice({
	name: "ordersCart",
	initialState: { cart: [] },
	reducers: {
		addItem: (state, { payload }) => {
			const itemIsExists = state.cart.find(
				(item) => item.product === payload.product
			);

			if (itemIsExists) toast.error("Barang sudah ada di keranjang");
			else state.cart.push({ ...payload, quantity: 1 });
		},

		removeItem: (state, { payload }) => {
			state.cart = state.cart.filter(
				(item) => item.product !== payload.product
			);
		},

		updateQuantity: (state, { payload }) => {
			const itemIsExists = state.cart.find(
				(item) => item.product === payload.product
			);

			if (itemIsExists) itemIsExists.quantity = payload.quantity;

			if (payload.quantity === "" || payload.quantity < 1) {
				itemIsExists.quantity = 1;
				toast.error("Jumlah barang tidak boleh kurang dari 1");
			}
		},

		clearCart: (state) => (state.cart = []),
	},
});

export const { addItem, removeItem, updateQuantity, clearCart } =
	ordersCartSlice.actions;
export default ordersCartSlice.reducer;
