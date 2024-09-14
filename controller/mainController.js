const taskService = require("../Service/taskService");
const projectService = require("../Service/projectService")
const TaskModel = require("../model/taskModel");
const ProjectModel = require("../model/projectModel")



exports.AddProject = async (req, res, next) => {
  const body = req.body;
  const id = req.user._id
  try {
    if (!body.title || !body.definition) {
      return res
        .status(400)
        .send({ status: "Error", message: "Title and definition are required." });
    }
    const projectData = {
      ...body,
      user : id
    }
    const project = await projectService.AddProject(projectData);
    res.status(201).send({status : "Success" , data : project}) // Redirect to task list after creating a task
  } catch (error) {
    next(error); 
  }
};


exports.getAllProjects = async (req , res , next) => {
  const userId = req.user._id
  try {
    const projects = await projectService.getAllProjects(userId)
    res.status(200).send({status : "Success", result : projects.length , projects : projects})
  } catch (error) {
    next(error)
  }
}


exports.updateProject = async(req , res , next) => {
  const projectId = req.params.projectId
  const userId = req.user._id
  const body = req.body
  try {
    const updatedProject = await projectService.updateProject(projectId , userId , body)
    res.status(200).send({status : "Success" , project : updatedProject})
  } catch (error) {
    next(error)
  }
}


exports.getProjectById = async (req , res , next) => {
  const userId = req.user._id
  const projectId = req.params.projectId
  try {
    const project = await projectService.getProjectById(userId , projectId)
    res.status(200).send({status : "Success", project : project})
  } catch (error) {
    next(error)
  }
}

exports.deleteProject = async (req , res , next) => {
  const projectId = req.params.projectId
  const userId = req.user._id
  try {
    const DeletedProject = await projectService.deleteProject(userId , projectId)
    res.status(200).send({status : "Success" , message: "project Deleted"})
  } catch (error) {
    next(error)
  }
}


exports.AddTask = async (req, res, next) => {
  const body = req.body
  const userId = req.user._id
  const projectId = req.params.projectId

  try {
    if (!body.title || !body.description) {
      return res
        .status(400)
        .send({ status: "Error", message: "Title and description are required." });
    }

    const TaskData = {
      ...body,
      user : userId,
      project : projectId
    }


    const task = await taskService.createTask(TaskData);


    const now = new Date();
    if (task.deadline <= now && !task.isCompleted) {
      console.log(`Task "${task.title}" has already passed its deadline.`);
      task.isCompleted = true;
      await task.save();
    }

    res.status(201).send({status : "Success" , data : task})
  } catch (error) {
    next(error);
  }
};


exports.getAllTasks = async (req, res, next) => {
  const userId = req.user._id
  const projectId = req.params.projectId
  try {
      const tasks = await taskService.getTasksService(userId , projectId)
      res.status(200).send({status : "Success" , result : tasks.length , tasks : tasks})
  } catch (error) {
    next(error)
  }
};


exports.getTaskbyId = async(req , res , next) => {
  const id = req.params.taskId
  const userId = req.user._id
  try {
    const task = await taskService.getTaskById(id , userId)
    res.status(200).send({status : "Success" , data : task})
  } catch (error) {
    next(error)
  }
}


exports.updateTask = async(req , res , next) => {
  const id = req.params.taskId
  const body = req.body
  const userId = req.user._id
  try {
    const updatedTask = await taskService.updateTask( id , body , userId)
    res.status(200).send({status: "Success" , data : updatedTask})
  } catch (error) {
    next(error)
  }
}


exports.deleteTask = async (req , res , next) => {
  const taskId = req.params.taskId
  const userId = req.user._id
  try {
     await taskService.deleteTask(taskId , userId)
     res.status(200).send({status : "Success" , data : "Task Deleted"})
  } catch (error) {
    next(error)
  }
}







