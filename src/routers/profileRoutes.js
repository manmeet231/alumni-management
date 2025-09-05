const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { getDirectory, getProfile, getEditProfile, editProfile, filterDirectory, getProfileById } = require('../controllers/profileController');

// Profile routes
router.get('/profile/:id', isAuthenticated, getProfileById);
router.get('/directory', isAuthenticated, getDirectory);
router.get('/edit-profile', isAuthenticated, getEditProfile);
router.post('/edit-profile', isAuthenticated, editProfile);

// Assuming you’re using Express with something like PostgreSQL or MongoDB
router.get('/directory/search', isAuthenticated, filterDirectory);
router.get("/profile", isAuthenticated, getProfile)

module.exports = router; 