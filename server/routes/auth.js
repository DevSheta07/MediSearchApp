const router  = require('express').Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');

// ── REGISTER ──
router.post('/register', async (req, res) => {
  try {
    console.log('📩 Register request received:', req.body);

    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log('⚠️  Email already registered:', email);
      return res.status(409).json({ message: 'Email is already registered. Please login instead.' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed });
    console.log('✅ User registered successfully:', user.email);

    res.status(201).json({ message: 'Account created successfully! Please login.' });

  } catch (err) {
    console.error('❌ Register error:', err.message);
    // Duplicate key error from MongoDB
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Email is already registered. Please login instead.' });
    }
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ── LOGIN ──────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    console.log('📩 Login request received:', req.body?.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log('⚠️  User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('⚠️  Wrong password for:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_dev_secret',
      { expiresIn: '7d' }
    );

    console.log('✅ User logged in:', user.email);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ── GET current user (protected) ───────────────
router.get('/me', require('../middleware/authMiddleware'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;