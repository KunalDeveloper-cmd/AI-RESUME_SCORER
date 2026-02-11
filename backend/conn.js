const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

if (!mongoUri || !mongoUri.startsWith('mongodb')) {
  console.error('MONGO_URI is not set to a valid MongoDB connection string. Please add it to your .env file.');
} else {
  mongoose
    .connect(mongoUri)
    .then(() => {
      console.log('Database Connected Successfully');
    })
    .catch((err) => {
      console.error('Database connection error', err);
    });
}