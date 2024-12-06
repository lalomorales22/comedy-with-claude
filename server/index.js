const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = new sqlite3.Database('/Users/brain/claudes.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to database successfully');
    }
});

// Promisify database queries
const runQuery = (query, params = []) => {
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err) {
                console.error('Query error:', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Test database connection endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Main database endpoint
app.post('/api/db', async (req, res) => {
    try {
        const { query, params } = req.body;
        console.log('Received query:', query);
        console.log('Received params:', params);

        const results = await runQuery(query, params);
        console.log('Query results:', results);
        res.json(results);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});