export const calculateGrandTotal = (items) => {
	return items.reduce((acc, item) => {
		return acc + item.quantity * item.price;
	}, 0);
};

export const calculateProfit = (items) => {
	return items.reduce((acc, item) => {
		return acc + item.quantity * (item.price - item.cost);
	}, 0);
};
