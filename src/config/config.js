const path = require('path');

module.exports = {
    PORT: process.env.PORT || 3000,
    SESSION_SECRET: process.env.SESSION_SECRET || 'yourSecretKey',
    STATIC_FILES: path.join(process.cwd(), 'public'),
    VIEWS_PATH: path.join(process.cwd(), 'views'),
    SESSION_CONFIG: {
        secret: process.env.SESSION_SECRET || 'yourSecretKey',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 // 1 hour in milliseconds
        }
    }
}; 