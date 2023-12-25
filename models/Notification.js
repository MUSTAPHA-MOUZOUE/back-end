const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema(
  {
    userId: {
      // type: Schema.Types.ObjectId,
      // ref: 'User',
      type: String,
      required: false,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["read", "noread"],
      default: "noread",
    },
  },
  { timestamps: true }
);
const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
