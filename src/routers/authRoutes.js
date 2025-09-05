const express = require('express');
const router = express.Router();
const { login, signup, logout } = require('../controllers/authController');

// Auth routes
router.get('/login', (req, res) => res.render('login.ejs'));
router.get('/signup', (req, res) => res.render('signup.ejs'));
router.get('/logout', logout);

router.post('/login', login);
router.post('/signup', signup);

module.exports = router; 