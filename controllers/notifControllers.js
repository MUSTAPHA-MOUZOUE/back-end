const NotifModel = require("../models/Notification");
const asyncHandler = require("express-async-handler");

// Create a notification
exports.createNotification = asyncHandler(async (req, res) => {
  const { userId, message } = req.body;

  const newNotification = new NotifModel({
    userId,
    message,
  });

  await newNotification.save();

  res.status(201).json({ data: newNotification });
});

// Mark a notification as read
exports.markNotificationAsRead = asyncHandler(async (req, res) => {
  const { notificationId } = req.params;

  const updatedNotification = await NotifModel.findByIdAndUpdate(
    notificationId,
    { status: "read" },
    { new: true }
  );

  res.json({ data: updatedNotification });
});

// Get unread notifications for a user
exports.getUnreadNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const unreadNotifications = await NotifModel.find({
    userId,
    status: "noread",
  });

  res.json({ data: unreadNotifications });
});

// Get all notifications for a user
exports.getAllNotifications = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const allNotifications = await NotifModel.find({ userId });

  res.json({ data: allNotifications });
});
