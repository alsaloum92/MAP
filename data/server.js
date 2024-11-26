const express = require('express');
const fetch = require('node-fetch'); // To fetch data from Mapbox API
require('dotenv').config(); // Load environment variables

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to proxy requests to Mapbox API
app.get('/mapbox-data', async (req, res) => {
    try {
        const response = await fetch('https://api.mapbox.com/endpoint', {
            headers: { 'Authorization': `Bearer ${process.env.MAPBOX_SECRET_ACCESS_TOKEN}` }
        });

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});