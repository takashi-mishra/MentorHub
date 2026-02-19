const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config();

// Requiring routes 
const mentorRoutes = require('./Routes/mentorRoutes');

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Routes
app.get('/', (req, res) => {
    res.send('Mentor service running on port 8000'); // Fixed port in message
});

app.use('/mentorRegister', mentorRoutes);

module.exports = app;