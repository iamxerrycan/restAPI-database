require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const appointmentRoute = require('./routes/appointmentRoute');
const contactRoutes = require('./routes/contactRautes');
const authRoute = require('./routes/authRoute');
const axios = require('axios');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
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

app.use('/api/appointments', appointmentRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/portfolio', contactRoutes);
app.use('/api/appointments/auth', authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
