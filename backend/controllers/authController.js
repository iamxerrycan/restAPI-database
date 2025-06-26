const { registerService, loginService } = require('../services/authService');

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await registerService(name, email, password);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email, password);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
