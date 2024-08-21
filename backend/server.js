const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/UserDetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    role: { type: String, default: 'user' },
    lastLoginDate: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

app.use(cors());
app.use(express.json());

app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, password, gender } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, gender });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      user.lastLoginDate = new Date();
      await user.save();
      res.json({ message: 'Login successful!', userId: user._id });
    } catch (err) {
      console.error('Login error', err);
      res.status(500).json({ error: err.message });
    }
  });
  
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Fetch profile details based on userId
app.get('/api/profile', async (req, res) => {
    const userId = req.header('userId');
    if (!userId) return res.status(401).json({ message: 'No userId, authorization denied' });

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const adminEmail = 'admin@email.com';
const adminPassword = 'Admin@123';

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
    const { email, password } = req.body;
    if (email === adminEmail && password === adminPassword) {
        // Admin login successful
        res.json({ message: 'Admin login successful!' });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// Endpoint to get all users
app.get('/api/admin/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Route to get user counts based on registration dates or any other criteria
app.get('/api/dashboard-stats', async (req, res) => {
    try {
        // Aggregate data (example: by month)
        const monthlyData = await User.aggregate([
            {
                $group: {
                    _id: { $month: "$lastLoginDate" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Example of total clicks or any other metric
        const totalClicks = await User.countDocuments(); // Replace with actual click count logic

        res.json({ monthlyData, totalClicks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
