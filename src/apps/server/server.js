const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Load jobs data from .env
let jobs = [];
try {
  jobs = JSON.parse(process.env.JOBS_DATA);
} catch (error) {
  console.error('Failed to parse JOBS_DATA from .env');
}

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    message: 'Backend is running!',
    status: 'success',
    timestamp: new Date().toISOString(),
  });
});

// GET all jobs
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

// GET a specific job by ID
app.get('/api/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const job = jobs.find(j => j.id === jobId);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ success: false, message: 'Job not found' });
  }
});

// POST a new job
app.post('/api/jobs', (req, res) => {
  const { title, company } = req.body;
  const newJob = {
    id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1,
    title,
    company,
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

// PUT (update) a job
app.put('/api/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const jobIndex = jobs.findIndex(j => j.id === jobId);
  if (jobIndex !== -1) {
    const { title, company } = req.body;
    jobs[jobIndex] = { id: jobId, title, company };
    res.json(jobs[jobIndex]);
  } else {
    res.status(404).json({ success: false, message: 'Job not found' });
  }
});

// DELETE a job
app.delete('/api/jobs/:id', (req, res) => {
  const jobId = parseInt(req.params.id);
  const jobIndex = jobs.findIndex(j => j.id === jobId);
  if (jobIndex !== -1) {
    const deletedJob = jobs.splice(jobIndex, 1);
    res.json({ success: true, job: deletedJob[0] });
  } else {
    res.status(404).json({ success: false, message: 'Job not found' });
  }
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
  console.log(`Express server running on: http://localhost:${PORT}`);
});
