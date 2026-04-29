const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");

const registerUser = async ({ name, email, password, role, lat, lng }) => {
  // 🔍 1. Check user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  // 🔐 2. Validate role
  const validRoles = ["restaurant", "ngo", "admin"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  // 🔒 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 🧾 4. Create user in DB
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

  return user;
};

module.exports = {
  registerUser,
};
