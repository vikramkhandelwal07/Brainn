// external modules
const mongoose = require('mongoose');
require('dotenv').config();

// function that connects with database 
const dbConnect = () =>{
  mongoose.connect(process.env.DATABASE_URL,{
  })
  .then(()=>{
    console.log("DB connection is successful")
  })
  .catch((error)=>{
    console.log("error while connecting to DB")
    console.error(error.message)
    process.exit(1);
  });
}

module.exports = dbConnect;
