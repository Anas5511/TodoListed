const ApiError = require("../utils/ApiError");
const TaskModel = require("../model/taskModel");
const ProjectModel = require("../model/projectModel")
const User = require("../model/userModel")

exports.createTask = async (data) => {
  try {
    const task =  await TaskModel.create(data);
    const project = await ProjectModel.findById(data.project)
    project.taskCount += 1 ;
    await project.save()
    return task;
  } catch (error) {
    throw error;
  }
};

// Get All Tasks of this user and project
exports.getTasksService = async (userId , projectId) => {
  try {
    if(!userId || !projectId){
      throw new ApiError("you must make an login" ,  401 )
    }
    const tasks = await TaskModel.find({ user : userId , project : projectId});
    return tasks;
  } catch (error) {
    throw error;
  }
};

exports.getTaskById = async (taskId , userId) => {
  try {
    const task = await TaskModel.findOne({user : userId , _id : taskId})
    if (!taskId || !userId) {
      throw new ApiError("you must make an login ", 404);
    }
    return task;
  } catch (error) {
    throw error;
  }
};

exports.updateTask = async (id, data , userId) => {
  try {
    const task = await TaskModel.findById(id)
    const user = await User.findById(userId)
    if(task.user.toString() !== user._id.toString()){
      throw new ApiError("you are not Authorized to update this task")
    }
    const updatedTask = await TaskModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      throw new ApiError("task not Found", 404);
    }
    return updatedTask;
  } catch (error) {
    throw error;
  }
};



exports.deleteTask = async (id, userId) => {
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      throw new ApiError('Task not found', 404);
    }

    const user = await User.findById(userId);
    if (task.user.toString() !== user._id.toString()) {
      throw new ApiError('You are not authorized to delete this task', 403);
    }

    const project = await ProjectModel.findById(task.project);
    project.taskCount -= 1;
    await project.save();

    // Delete the task from the database
    await TaskModel.findByIdAndDelete(id);

    return { message: "Task successfully deleted" };
  } catch (error) {
    throw error;
  }
};
