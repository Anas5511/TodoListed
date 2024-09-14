const express = require("express");
const router = express.Router();
const mainController = require("../controller/mainController");
const authorization = require("../middleware/authentication");

 
// Route to render the create task form
router.get("/createTask", (req, res) => {
  res.render("createTask");
});


// This Routes is to Add project
router.post("/create", authorization.protect , mainController.AddProject)

// This Routes is to Update Project using projectId and the useID 
router.patch("/:projectId/update" , authorization.protect , mainController.updateProject)

// This Routes is to get ProjectById
router.get("/:projectId" , authorization.protect , mainController.getProjectById )

// This Routes is to get all the the projects
router.get("/" , authorization.protect , mainController.getAllProjects )

// This Routes is to Delete Project using project Id and and userId
router.delete("/:projectId/delete" , authorization.protect , mainController.deleteProject)








 
// This Routes is to add task in side the project using the project Id
router.post("/:projectId/tasks/create" , authorization.protect , mainController.AddTask);

// This Routes is to get all the tasks of the this project using the project Id knowing that this project is to only one user
router.get("/:projectId/tasks"  , authorization.protect , mainController.getAllTasks);

// This Routes is to get task by Id without userId or projectId
router.get("/tasks/:taskId", authorization.protect, mainController.getTaskbyId);

// This Routes is to update task using userId and taskId
router.patch("/tasks/:taskId" , authorization.protect , mainController.updateTask)

// This Routes is to delete the task using the taskId and projectId to decrease the tasksCounts
router.delete("/tasks/:taskId", authorization.protect , mainController.deleteTask);

module.exports = router;
