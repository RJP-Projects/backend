const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const societyRoutes = require('./routes/societyRoutes');
const userRoutes = require('./routes/userRoutes');
const residentRoutes = require('./routes/residentManagement');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/society', societyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/resident-management', residentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



