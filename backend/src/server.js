import app from "./app.js";
import http from "http";
import mongoose from "mongoose";
import { dbURI, port } from "./app/config/index.js";

// create server
const server = http.createServer(app);

mongoose.set("strictQuery", false);

// connect to mongodb
const connectDB = async () => {
	try {
		const conn = await mongoose.connect(dbURI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			replicaSet: "rs0",
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

// Connect to the database before listening
connectDB().then(
	server.listen(port, () => {
		console.log(`Listening for requests ${port}`);
	})
);
