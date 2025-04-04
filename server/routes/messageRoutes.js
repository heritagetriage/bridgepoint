const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");

// Public route for creating messages (contact form)
router.post("/", messageController.createMessage);

// Protected admin routes
router.get(
  "/",
  verifyToken,
  checkRole(["admin", "staff"]),
  messageController.getMessages
);
router.get(
  "/stats",
  verifyToken,
  checkRole(["admin", "staff"]),
  messageController.getMessageStats
);
router.get(
  "/:id",
  verifyToken,
  checkRole(["admin", "staff"]),
  messageController.getMessage
);
router.put(
  "/:id/status",
  verifyToken,
  checkRole(["admin", "staff"]),
  messageController.updateMessageStatus
);
router.delete(
  "/:id",
  verifyToken,
  checkRole(["admin"]),
  messageController.deleteMessage
);

module.exports = router;
