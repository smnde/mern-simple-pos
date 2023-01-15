import { createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "../api/dashboard.api";

const chartSlice = createSlice({
	name: "chart",
	initialState: { chart: [] },
	extraReducers: (builder) => {
		builder.addMatcher(
			dashboardApi.endpoints.getDashboard.matchFulfilled,
			(state, action) => {
				if (state.chart.length === 0) {
					for (let i = 6; i >= 0; i--) {
						state.chart = [
							...state.chart,
							{
								date: new Date(new Date().setDate(new Date().getDate() - i))
									.toISOString()
									.slice(0, 10),
								revenue: action.payload.data.sales.reduce((acc, cur) => {
									const sellingDate = new Date(cur.createdAt);
									return sellingDate.getDate() ===
										new Date(
											new Date().setDate(new Date().getDate() - i)
										).getDate() &&
										sellingDate.getMonth() === new Date().getMonth()
										? acc + cur.grandTotal
										: acc;
								}, 0),
								profit: action.payload.data.sales.reduce((acc, cur) => {
									const sellingDate = new Date(cur.createdAt);
									return sellingDate.getDate() ===
										new Date(
											new Date().setDate(new Date().getDate() - i)
										).getDate() &&
										sellingDate.getMonth() === new Date().getMonth()
										? acc + cur.totalProfit
										: acc;
								}, 0),
							},
						];
					}
				} else {
					// if chart is not empty
					// loop through 7 days
					for (let i = 6; i >= 0; i--) {
						// loop through chart
						for (let j = 0; j < state.chart.length; j++) {
							// if chart date is equal to current date
							if (
								state.chart[j].date ===
								new Date(new Date().setDate(new Date().getDate() - i))
									.toISOString()
									.slice(0, 10)
							) {
								// update chart
								state.chart[j].revenue = action.payload.sellings.reduce(
									(acc, cur) => {
										const sellingDate = new Date(cur.createdAt);
										return sellingDate.getDate() ===
											new Date(
												new Date().setDate(new Date().getDate() - i)
											).getDate() &&
											sellingDate.getMonth() === new Date().getMonth()
											? acc + cur.grandTotal
											: acc;
									},
									0
								);
								state.chart[j].profit = action.payload.sellings.reduce(
									(acc, cur) => {
										const sellingDate = new Date(cur.createdAt);
										return sellingDate.getDate() ===
											new Date(
												new Date().setDate(new Date().getDate() - i)
											).getDate() &&
											sellingDate.getMonth() === new Date().getMonth()
											? acc + cur.totalProfit
											: acc;
									},
									0
								);
							}
						}
					}
				}
			}
		);
	},
});

export default chartSlice.reducer;
