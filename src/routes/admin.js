const express = require('express');
const router = express.Router();
const { 
    login, 
    getDashboardStats, 
    getRecentMessages, 
    changePassword 
} = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/auth');

// Public route for login
router.post('/login', login);

// Protected routes
router.get('/dashboard', authenticateToken, getDashboardStats);
router.get('/messages/recent', authenticateToken, getRecentMessages);
router.put('/change-password', authenticateToken, changePassword);

module.exports = router; 