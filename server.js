const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const societyRoutes = require('./routes/societyRoutes');
const userRoutes = require('./routes/userRoutes');
const residentRoutes = require('./routes/residentManagement');
const maintenanceRoutes = require('./routes/maintenanceRoutes');
const otherIncomeRoutes = require('./routes/otherIncomeRoutes');
const expenseRoutes = require('./routes/expenses');
const noteRoutes = require("./routes/noteRoutes");
const facilityRoutes = require('./routes/facilityRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const requestRoutes = require('./routes/requestRoutes');
const visitorLogsRoutes = require('./routes/visitorLogs');
const securityProtocolsRoutes = require('./routes/securityProtocols');
const securityGuardRoutes = require('./routes/securityGuardRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const importantNumberRoutes = require('./routes/importantNumberRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/society', societyRoutes);
app.use('/api/user', userRoutes);
app.use('/api/resident-management', residentRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/other-income', otherIncomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use("/api/notes", noteRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/visitor-logs', visitorLogsRoutes);
app.use('/api/security-protocols', securityProtocolsRoutes);
app.use('/api/security-guards',securityGuardRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/important-number', importantNumberRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));