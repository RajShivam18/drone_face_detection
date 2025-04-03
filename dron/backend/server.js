const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid'); // UUID for unique IDs

const app = express();
app.use(express.json());
app.use(cors());

// 🟢 Connect to MongoDB (Change URL if using MongoDB Atlas)
mongoose.connect('mongodb://localhost:27017/userDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// 🟢 Create a User Schema
const UserSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true }, // Unique User ID
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', UserSchema);

// 🟢 Get all users
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// 🟢 Add a new user with a unique ID
app.post('/api/add-user', async (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new User({ id: uuidv4(), name, email, age });

    try {
        await newUser.save();
        res.json({ message: "User added successfully!", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🟢 Find a user by their unique ID
app.get('/api/user/:id', async (req, res) => {
    const user = await User.findOne({ id: req.params.id });
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// 🟢 Delete a user by their unique ID
app.delete('/api/user/:id', async (req, res) => {
    const result = await User.findOneAndDelete({ id: req.params.id });
    if (result) {
        res.json({ message: "User deleted successfully" });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// 🟢 Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



