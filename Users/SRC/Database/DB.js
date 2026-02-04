const mongoose = require('mongoose')

const DatabaseConnection = async () => {
   try {
     mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log("Database connection failed", err);
    });
   } catch (error) {
    console.log("Database connection error", error);
   }
}

module.exports = DatabaseConnection;