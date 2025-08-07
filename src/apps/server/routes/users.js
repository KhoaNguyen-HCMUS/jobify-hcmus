const express = require('express');
const router = express.Router();

// Load jobs data from .env
let jobs = [];
try {
  jobs = JSON.parse(process.env.JOBS_DATA);
} catch (error) {
  console.error('Failed to parse JOBS_DATA from .env');
}

// Get all Users
router.get('/', (req, res) => {
  res.json(users);
});

// Get User by ID
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Create User
router.post('/', (req, res) => {
	const user = { id: Date.now(), ...req.body };
	users.push(user);
	res.status(201).json(user);
  });

// Update User by ID
router.put('/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  res.json(users[index]);
});

// Delete User by ID
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'User not found' });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

module.exports = router;
