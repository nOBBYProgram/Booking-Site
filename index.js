const express = require('express');
const app = express();
// Import the dotenv module
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const myrouter = require('./routes/auth');
const hotels = require('./routes/hotels');
const users = require('./routes/users')
const cookieParser = require('cookie-parser');
const rooms = require('./routes/rooms');

const cors = require ('cors')

// Load the environment variables from the .env file
dotenv.config();
// Now you can access the environment variables using the process.env object
console.log(process.env.MONGO);

const connect = async()=>{
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongodb Successfully");
  } catch (error) {
   throw error;
  }
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/auth',myrouter);
app.use('/auth/hotels',hotels);
app.use('/auth/rooms',rooms)
app.use('/auth/user',users)

app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something Went wrong";
  res.status(errorStatus).json({
    success : false,
    status : errorStatus,
    message : errorMessage,
    stack : err.stack,
  })
})
app.listen(8000,()=>{
    connect();
    console.log("Connected to backend server");
})