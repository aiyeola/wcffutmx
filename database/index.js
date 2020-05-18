/* eslint-disable operator-linebreak */
/* eslint-disable no-console */
const mongoose = require('mongoose');
require('./models/bioForm');
require('./models/admin');

const dbUri =
  process.env.NODE === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017/wcffutmx';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
};

connectMongoDB();

mongoose.connection.on('error', (err) => {
  console.log(err);
});
