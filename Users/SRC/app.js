const express = require('express');
const app = express();
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//requiring routes 
const userRoutes = require('./Routes/userRoutes');


//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));


// routes
app.get('/', (req, res) => {
    res.send('User service running on port 4000');
});

app.use('/userRegister', userRoutes);  


module.exports = app;