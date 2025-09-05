const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const { isAuthenticated } = require('../middleware/auth');
const { getAllPosts, createPost, getDashboardPosts } = require('../controllers/postController');

// Post routes
router.get('/feed', isAuthenticated, getAllPosts);
router.get('/dashboard', isAuthenticated, getDashboardPosts);
router.post('/post', isAuthenticated, upload.none(), createPost);

module.exports = router; 