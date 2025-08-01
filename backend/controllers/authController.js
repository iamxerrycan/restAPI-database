const { registerService, loginService } = require('../services/authService');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  try {
    const user = await registerService({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Registration failed." });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await loginService({ email, password });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: error.message || "Login failed." });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
