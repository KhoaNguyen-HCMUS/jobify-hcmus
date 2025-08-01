const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);
const profileRoutes = require('./routes/profile.routes');
app.use('/api/profile', profileRoutes);
const jobRoutes = require('./routes/job.routes');
app.use('/api/jobs', jobRoutes);
const industryRoutes = require('./routes/industry.routes');
app.use('/api/industries', industryRoutes);
const applicationRoutes = require('./routes/application.routes');
app.use('/api/applications', applicationRoutes);
const companyRoutes = require('./routes/company.routes');
app.use('/api/company', companyRoutes);
const adminRoutes = require('./routes/admin.routes');
app.use('/api/admin', adminRoutes);
const notificationRoutes = require('./routes/notification.routes');
app.use('/api/notifications', notificationRoutes);
const announcementRoutes = require('./routes/announcement.routes');
app.use('/api/announcements', announcementRoutes);
const reportRoutes = require('./routes/report.routes');
app.use('/api/reports', reportRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Backend is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
