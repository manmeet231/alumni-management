const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/config');

// Import routes
const authRoutes = require('./routers/authRoutes');
const postRoutes = require('./routers/postRoutes');
const achievementRoutes = require('./routers/achievementRoutes');
const profileRoutes = require('./routers/profileRoutes');

const app = express();

// Session middleware
app.use(session(config.SESSION_CONFIG));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static files and view engine setup
app.use(express.static(config.STATIC_FILES));
app.set('view engine', 'ejs');
app.set('views', config.VIEWS_PATH);

// Home route
app.get('/', (req, res) => {
    res.sendFile(path.join(config.STATIC_FILES, 'home.html'));
});

// Use modular routes
app.use(authRoutes);
app.use(postRoutes);
app.use(achievementRoutes);
app.use(profileRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(config.PORT, () => {
    console.log(`Server running on http://localhost:${config.PORT}`);
});
