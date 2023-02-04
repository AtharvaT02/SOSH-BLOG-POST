const mongoose = require('mongoose');

const uri = 'mongodb+srv://Lonewalker:nFfKHDLKatHNKTwE@cluster0.wkleu6t.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
