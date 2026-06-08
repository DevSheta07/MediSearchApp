const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// ── REGISTER ──
router.post('/register', async (req, res) => {
  try {
    // console.log('📩 Register request received:', req.body);

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
      // console.log('⚠️  Email already registered:', email);
      return res.status(409).json({ message: 'Email is already registered. Please login instead.' });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed });
    // console.log('✅ User registered successfully:', user.email);

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
    // console.log('📩 Login request received:', req.body?.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // console.log('⚠️  User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // console.log('⚠️  Wrong password for:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'fallback_dev_secret',
      { expiresIn: '7d' }
    );

    // console.log('✅ User logged in:', user.email);

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

// ── FORGOT PASSWORD ────────────────────────────
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required.' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'No account with that email exists.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Dynamically grab the request's origin (e.g. https://aushadhsetu.onrender.com) so links open correctly in production
    const origin = (req.get('origin') || req.get('referer') || 'http://localhost:3000').replace(/\/$/, "");
    const resetUrl = `${origin}/reset-password/${token}`;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"AushadhSetu Care" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: 'Password Reset Request — AushadhSetu',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; padding: 24px; color: #1a202c;">
            <h2 style="color: #1a9d5c; margin-top: 0;">AushadhSetu 🩺</h2>
            <p>Hello <strong>${user.name}</strong>,</p>
            <p>We received a request to reset your password for your AushadhSetu account.</p>
            <p style="margin: 24px 0;">
              <a href="${resetUrl}" style="background-color: #1a9d5c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
            </p>
            <p style="font-size: 12px; color: #718096;">If you didn't request this password reset, please ignore this email. The link is valid for 1 hour.</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ message: 'A password reset link has been successfully sent to your email.' });
    } else {
      // Fallback behavior when email service is not configured
      console.log(`\n🔑 [AushadhSetu Recovery URL]: ${resetUrl}\n`);
      res.json({ message: 'Password reset link generated. Check server logs.' });
    }
  } catch (err) {
    console.error('❌ Forgot Password error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

// ── RESET PASSWORD ─────────────────────────────
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully! Please login.' });
  } catch (err) {
    console.error('❌ Reset Password error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
});

module.exports = router;