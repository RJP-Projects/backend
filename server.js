const express = require('express');
const connectDB = require('./config/db');

// Import routes
const authRoutes = require('./routes/auth');
const societyRoutes = require('./routes/society');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);     
app.use('/api/society', societyRoutes); 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
