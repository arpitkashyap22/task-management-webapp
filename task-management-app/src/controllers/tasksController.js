const prisma = require('../prisma.js');

// Get all tasks
const getAllTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
  res.json(tasks);
};

// Get a single task
const getTaskById = async (req, res) => {
  const  id  = req.params.id;
  // console.log(id);
  
  const task = await prisma.task.findUnique({ where: { id: Number(id), userId: req.user.id } });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);

};

// Create a task
const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: { title, description, userId: req.user.id }
  });
  res.status(201).json(task);
};

// Update a task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await prisma.task.update({
    where: { id: Number(id), userId: req.user.id },
    data: { title, description, completed }
  });
  res.json(task);
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await prisma.task.delete({ where: { id: Number(id), userId: req.user.id } });
  res.status(204).send();
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
