const express = require("express");

const {
  getUnreadNotifications,
  getAllNotifications,
  createNotification,
  markNotificationAsRead,
} = require("../controllers/notifControllers.js");

const router = express.Router();

// Create a new notification
router.post("/", createNotification);

router.get("/:userId/unread", getUnreadNotifications);

// Get all notifications for a user
router.get("/:userId", getAllNotifications);

// Mark a notification as read
router.put("/:notificationId/read", markNotificationAsRead);

module.exports = router;
