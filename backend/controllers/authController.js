const { registerUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  register,
};
