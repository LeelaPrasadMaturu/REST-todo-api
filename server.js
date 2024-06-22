require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const NodeCache = require('node-cache');

const app = express();
const port = process.env.PORT || 3000;

// Initialize cache
const cache = new NodeCache();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', (req, res, next) => {
    req.cache = cache;
    next();
}, authMiddleware, todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
