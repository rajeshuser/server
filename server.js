const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userRouter } = require("./Routes/User.Route");
const { productsRouter } = require("./Routes/Products.Route");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Home Page");
});

app.use("/users", userRouter);
app.use("/products", productsRouter);

connectThenListen();

async function connectThenListen() {
	try {
		const connection = mongoose.connect(process.env.mongoURL);
		await connection;
		console.log("App is connected to database");
		app.listen(process.env.port, () => {
			console.log(`Server is runnig at ${process.env.port}`);
		});
	} catch (error) {
		console.log({ error: error.message });
	}
}
