const express = require('express');
const router = express.Router();
const { 
    submitMessage, 
    getAllMessages, 
    getMessageById, 
    deleteMessage 
} = require('../controllers/contactController');
const { authenticateToken } = require('../middleware/auth');

// Public route to submit contact message
router.post('/', submitMessage);

// Protected routes for admin
router.get('/', authenticateToken, getAllMessages);
router.get('/:id', authenticateToken, getMessageById);
router.delete('/:id', authenticateToken, deleteMessage);

module.exports = router; 