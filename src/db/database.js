const { Pool } = require('pg');
require('dotenv').config();

// const pool = new Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
//     max: 20, // Maximum number of clients in the pool
//     idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
//     connectionTimeoutMillis: 2000 // How long to wait for a connection to be established
// })
const pool = new Pool({

    connectionString: process.env.DATABASE_URL, // Use connection string from cloud provider
    ssl: {
        rejectUnauthorized: false // Only if using SSL (common for cloud databases)
    }
});

module.exports = pool; // Export the pool so it can be used in other parts of the app
