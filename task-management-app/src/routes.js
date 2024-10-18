const express = require('express');
const {getAllTasks, getTaskById, createTask, updateTask, deleteTask } = require('./controllers/tasksController.js'); // Ensure these are correct
const { registerUser, loginUser } = require('./controllers/usersController.js');
const { authenticate } = require('./middlewares.js');
const router = express.Router();

// Task Routes (Protected)
router.get('/tasks', authenticate, getAllTasks);  // Check this line
router.get('/tasks/:id', authenticate, getTaskById);  // Check this line
router.post('/tasks', authenticate, createTask);  // Check this line
router.put('/tasks/:id', authenticate, updateTask);  // Check this line
router.delete('/tasks/:id', authenticate, deleteTask);  // Check this line

// User Routes
router.post('/auth/register', registerUser);  // Check this line
router.post('/auth/login', loginUser);  // Check this line

module.exports = router;
