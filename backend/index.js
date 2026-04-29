const dotenv = require("dotenv");
require("dotenv").config();

const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
