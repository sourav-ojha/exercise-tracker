// jbSejUiiMmHVl9xQ
// admin1

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found");
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectDB };
