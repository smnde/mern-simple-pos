import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const salesCartSlice = createSlice({
	name: "salesCart",
	initialState: { cart: [] },
	reducers: {
		addItem: (state, { payload }) => {
			const itemIsExists = state.cart.find(
				(item) => item.product === payload.product
			);

			if (payload.stock < 1) toast.error("Stok barang tidak mencukupi");

			if (itemIsExists) toast.error("Barang sudah ada di keranjang");
			else
				state.cart.push({
					...payload,
					quantity: 1,
					total: payload.price * payload.quantity,
				});
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

			if (itemIsExists) {
				itemIsExists.quantity = payload.quantity;
				itemIsExists.total = itemIsExists.price * itemIsExists.quantity;
			}

			if (payload.quantity > payload.stock) {
				itemIsExists.quantity = payload.stock;
				toast.error("Stok tidak mencukupi");
			}

			if (payload.quantity === "" || payload.quantity < 1) {
				itemIsExists.quantity = 1;
				toast.error("Jumlah barang tidak boleh kurang dari 1");
			}
		},

		clearCart: (state) => (state.cart = []),
	},
});

export const { addItem, removeItem, updateQuantity, clearCart } =
	salesCartSlice.actions;
export default salesCartSlice.reducer;
