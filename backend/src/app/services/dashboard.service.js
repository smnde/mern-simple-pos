import Sales from "../schemas/sales.schemas.js";

const DashboardService = {
	/**
	 * @param {Request} req
	 * @param {Response} res
	 * @returns {Promise<Response>}
	 * @description Get dashboard data
	 * @route GET /dashboard
	 * @access Public
	 */
	index: async (req, res) => {
		try {
			const sales = await Sales.find({})
				.where("createdAt")
				.gte(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000)
				.where("status")
				.equals("sold")
				.exec();
			// Filter sales by date
			const todaySales = sales.filter((sale) => {
				const salesDate = new Date(sale.createdAt);
				return (
					salesDate.getDate() === new Date().getDate() &&
					salesDate.getMonth() === new Date().getMonth() &&
					salesDate.getFullYear() === new Date().getFullYear()
				);
			});
			// get todays revenue
			const todayRevenue = todaySales.reduce((acc, sale) => {
				return acc + sale.grandTotal;
			}, 0);
			// get todays profit
			const todayProfit = todaySales.reduce((acc, sale) => {
				return acc + sale.totalProfit;
			}, 0);
			// today sales count
			const todaySalesCount = todaySales.length;
			return res.status(200).json({
				status: "success",
				data: {
					todayRevenue,
					todayProfit,
					todaySalesCount,
				},
			});
		} catch (error) {
			return res.status(500).json({
				status: "error",
				message: error.message,
			});
		}
	},
};

export default DashboardService;
