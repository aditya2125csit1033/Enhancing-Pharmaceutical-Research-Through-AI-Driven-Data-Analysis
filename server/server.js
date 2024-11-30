// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./models'); // Sequelize models
const router = require('./router/auth-router'); // Importing the router for auth routes

const app = express();

// Middleware Setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser()); // Parse cookies
app.use(bodyParser.json()); // Parse request bodies
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}));

// Synchronize models with the database
db.sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000; // Use the environment PORT or default to 5000
    app.listen(PORT, () => {
        console.log(`Server is running at port: ${PORT}`);
    });
});

// Use the router for handling routes
app.use('/', router);
