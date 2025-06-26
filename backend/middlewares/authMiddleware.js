const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => { 
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      return next(); // important: return here to avoid falling through
    } catch (error) {
      console.error(error);
      res.status(401);
      return res.json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401);
    return res.json({ message: 'Not authorized, no token' });
  }
};

module.exports = protect;
