const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
    console.log('MongoDB connection established successfully!');
});

mongoose.connection.on('error', (error) => {
    console.error('Error while connecting to MongoDB: ', error);
});

async function mongoConnect() {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully!');
    } catch (error) {
        console.error('Error occurred while connecting to MongoDB: ', error);
    }
}

async function mongoDisconnect() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB successfully!');
    } catch (error) {
        console.error('Error occurred while disconnecting from MongoDB: ', error);
    }
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
};
