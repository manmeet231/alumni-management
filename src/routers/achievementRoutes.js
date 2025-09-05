const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { getAchievements, addAchievement } = require('../controllers/achievementController');

// Achievement routes
router.get('/achievements', isAuthenticated, getAchievements);
router.post('/add-achievements', isAuthenticated, addAchievement);

module.exports = router; 