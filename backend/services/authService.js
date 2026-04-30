const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async ({ name, email, password, role, lat, lng }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  if (password.length < 6) {
    throw new Error("Enter Strong password");
  }

  const validRoles = ["restaurant", "ngo", "admin"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
      lat,
      lng,
    },
  });

  const token = generateToken(user);

  return { user, token };
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Incorrect Password");
  }

  const token = generateToken(user);

  return { user, token };
};

module.exports = {
  registerUser,
  loginUser,
};
