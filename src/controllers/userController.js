const jwt = require('jsonwebtoken'); 
const User = require('../models/User');

exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const exists = await User.findOne({ $or: [{email}, {username}] });
    if (exists) return res.status(409).json({ status:false, message:'User already exists' });

    const user = await User.create({ username, email, password });
    return res.status(201).json({
      message: 'User created successfully.',
      user_id: user._id.toString()
    });
  } catch (e) { next(e); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne(email ? { email } : { username });
    if (!user) return res.status(401).json({ status:false, message:'Invalid Username and password' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ status:false, message:'Invalid Username and password' });

    // Optional JWT
    const jwt_token = process.env.JWT_SECRET
      ? jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
      : undefined;

    return res.status(200).json({
      message: 'Login successful.',
      ...(jwt_token ? { jwt_token } : {})
    });
  } catch (e) { next(e); }
};
