require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const { mongoConnect } = require('./src/services/mongo');
const api = require('./src/routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware registration function
function registerMiddleware(app) {
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '..', 'public')));
    // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
    app.use(cors({
        origin: [
            'http://localhost:3000',
            'https://construction-frontend.onrender.com'
    ]
    }));
    app.use(morgan('combined'));
    app.use('/v1', api);

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);  // Consider replacing with a logger
        res.status(500).send('Something broke!');
    });
}

// Start the server
async function startServer() {
    await mongoConnect();
    
    registerMiddleware(app);

    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}...`);
    });
};

startServer();

// Handle unhandled Promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});
