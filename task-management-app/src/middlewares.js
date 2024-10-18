const jwt = require('jsonwebtoken');
const { user } = require('./prisma');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticate };