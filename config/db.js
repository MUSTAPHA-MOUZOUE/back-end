const mongoose = require("mongoose");

const dbConnection = async () => {
  console.log("DB_URI:", process.env.DB_URI);

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Database Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Database Error: ${error}`);
    process.exit(1);
  }
};

module.exports = dbConnection;
