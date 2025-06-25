const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');

// Public route to get profile
router.get('/', getProfile);

// Protected route to update profile
router.put('/', authenticateToken, updateProfile);

module.exports = router; 