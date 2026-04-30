const { registerUser, loginUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production (https)
        sameSite: "strict",
      })
      .status(201)
      .json({
        message: "User registered successfully",
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await loginUser(req.body);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "Login successful",
        user,
        token,
      });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
