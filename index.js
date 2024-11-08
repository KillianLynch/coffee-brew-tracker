const express = require('express');
const path = require('path');
const { initialize, oracledb } = require('./db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve the HTML file at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/brews', async (req, res) => {
    console.log("GET /brews request received");

    const conn = await oracledb.getConnection();
    console.log("Database connection established");

    const result = await conn.execute(
        'SELECT * FROM coffee_brews ORDER BY timestamp DESC',
        [],
        { outFormat: oracledb.OUT_FORMAT_OBJECT } // This option returns rows as JavaScript objects
    );
    console.log("Fetched brews from database:", result.rows);

    res.json(result.rows);
    await conn.close();
    console.log("Database connection closed after fetching brews");
});

app.post('/brews', async (req, res) => {
    const { brew_method, bean_origin, grind_size, temperature, brew_time, notes, rating } = req.body;
    const conn = await oracledb.getConnection();
    await conn.execute(
        `INSERT INTO coffee_brews (brew_method, bean_origin, grind_size, temperature, brew_time, notes, rating)
         VALUES (:brew_method, :bean_origin, :grind_size, :temperature, :brew_time, :notes, :rating)`,
        [brew_method, bean_origin, grind_size, temperature, brew_time, notes, rating],
        { autoCommit: true }
    );
    res.status(201).json({ message: 'Brew logged successfully' });
    await conn.close();
});

// Start the server
initialize(); // Initialize the database connection pool
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});