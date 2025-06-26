require("dotenv").config(); // 👈 this activates .env
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");
const appointmentRoute = require("./routes/appointmentRoute");
const contactRoutes = require("./routes/contactRautes");
const authRoute = require("./routes/authRoute"); 
const axios = require("axios");

// Initialize express app
const app = express();

//connect to MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true }));

app.get('/weather', async (req, res) => {
  const { q } = req.query;
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=${process.env.OPENWEATHER_KEY}`
    );
    res.json(result.data);
  } catch (err) {
    res.status(500).json({ error: 'Weather fetch failed' });
  }
});

// // Routes
app.use(`/api/appointments`, appointmentRoute);
app.use(`/uploads`, express.static(path.join(__dirname, `uploads`))); 

//portfolio
app.use("/api/portfollio", contactRoutes);


// Auth
app.use("/api/appointments/auth", authRoute);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log(`MongoDB connected successfully`);
// });