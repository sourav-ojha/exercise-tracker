// jbSejUiiMmHVl9xQ
// admin1

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin1:jbSejUiiMmHVl9xQ@cluster0.mbns1.mongodb.net/exercisetracker?retryWrites=true&w=majority&appName=Cluster0",
      {}
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
