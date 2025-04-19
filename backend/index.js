require("dotenv").config(); // 👈 this activates .env
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const appointmentRoute = require("./routes/appointmentRoute");
const contactRoutes = require("./routes/contactRautes");

// Initialize express app
const app = express();

//connect to MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// // Routes
app.use(`/api/appointments`, appointmentRoute);
app.use(`/uploads`, express.static(path.join(__dirname, `uploads`))); 

//portfolio
app.use("/api", contactRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`MongoDB connected successfully`);
// });