const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    deadline: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = TaskModel;
