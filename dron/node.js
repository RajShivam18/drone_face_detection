const express = require('express');
const app = express();

// Home Route
app.get('/', (req, res) => {
    res.send('🚀 Node.js Server is Running Successfully!');
});

// Test Route
app.get('/test', (req, res) => {
    res.json({ message: "✅ API is working fine!" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`);
});
