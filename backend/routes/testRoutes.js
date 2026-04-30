const express = require("express");
const { protect, authorizeRoles } = require("../middleware/authMiddleware");

const router = express.Router();

// 👤 COMMON (sab login users)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

// 🍽️ RESTAURANT ONLY
router.get("/restaurant", protect, authorizeRoles("restaurant"), (req, res) => {
  res.json({
    message: "Restaurant dashboard access granted",
  });
});

// 🤝 NGO ONLY
router.get("/ngo", protect, authorizeRoles("ngo"), (req, res) => {
  res.json({
    message: "NGO dashboard access granted",
  });
});

// 🛡️ ADMIN ONLY
router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
  res.json({
    message: "Admin access granted",
  });
});

// 🔥 MULTI ROLE (restaurant + admin)
router.get(
  "/manage-food",
  protect,
  authorizeRoles("restaurant", "admin"),
  (req, res) => {
    res.json({
      message: "Food management access",
    });
  },
);

module.exports = router;
