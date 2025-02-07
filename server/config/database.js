const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    };
    
    await mongoose.connect(process.env.DATABASE_URL, options);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    // Instead of exiting, let's just log the error
    console.log('Using fallback data...');
  }
};

module.exports = { connectDB };