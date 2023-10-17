const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.login(email, name, password);
    const token = createToken(user._id);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async function (req, res) {
  const { email, name, password } = req.body;

  try {
    const user = await User.signup(email, name, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ name, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser };
