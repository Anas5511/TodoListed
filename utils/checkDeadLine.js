// jobs/checkDeadlines.js
const cron = require("node-cron");
const TaskModel = require("../model/taskModel"); // Adjust path based on file structure

// Schedule the cron job
const checkDeadlines = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      const overdueTasks = await TaskModel.find({
        deadline: { $lte: now },
        isCompleted: false,
      });

      if (overdueTasks.length > 0) {
        overdueTasks.forEach((task) => {
          console.log(`Task "${task.title}" has reached its deadline.`);
          task.isCompleted = true; // Or handle differently
          task.save();
        }); 
      }
    } catch (error) {
      console.error("Error checking deadlines:", error);
    }
  });
};

module.exports = checkDeadlines;
