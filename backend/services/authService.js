const User = require('../models/userModel');
const { generateToken } = require('../utils/jwtHelper');

const registerService = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  try {
    console.log("🟢 Creating user with:", { name, email, password });

    const user = await User.create({ name, email, password });

    const token = generateToken(user._id);

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    };
  } catch (err) {
    console.error("❌ User creation error:", err); // See the real error
    throw new Error("Failed to register user: " + err.message);
  }
};


const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user._id);

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    token,
  };
};

module.exports = {
  registerService,
  loginService,
};
