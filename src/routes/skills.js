const express = require('express');
const router = express.Router();
const { 
    getAllSkills, 
    getSkillsByCategory, 
    addSkill, 
    updateSkill, 
    deleteSkill 
} = require('../controllers/skillController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.get('/', getAllSkills);
router.get('/category/:category', getSkillsByCategory);

// Protected routes
router.post('/', authenticateToken, addSkill);
router.put('/:id', authenticateToken, updateSkill);
router.delete('/:id', authenticateToken, deleteSkill);

module.exports = router; 