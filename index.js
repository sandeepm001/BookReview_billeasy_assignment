const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./Routes/auth.js')
const bookRoutes = require('./Routes/book.js')
const reviewRoutes = require('./Routes/reviews.js')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express()

//setting up db connection
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("DB connected successfully");
	} catch (err) {
		console.error("DB connection error:", err);
		process.exit(1);
	}
};

app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.json());
//apis
app.use("/api/auth",authRoutes);
app.use("/api/book",bookRoutes);
app.use("/api/review",reviewRoutes);

//error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

//starting our server
const startServer = async () => {
	await connectDB();
	app.listen(3000, () => {
		console.log("Server listening on port 3000...");
	});
};

startServer();
