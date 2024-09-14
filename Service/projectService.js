const ProjectModel = require("../model/projectModel")
const TaskModel = require("../model/taskModel")
const ApiError = require("../utils/ApiError")
exports.AddProject = async (data) => {
    try {
        const project = await ProjectModel.create(data)
        return project
    } catch (error) {
        throw error
    }
}

exports.getAllProjects = async( id ) => {
    try {
        const projects = await ProjectModel.find({user : id})
        return projects;
    } catch (error) {
        throw error
    }
}


exports.updateProject = async(projectId , userId , projectData ) => {
    try {
        const project = await ProjectModel.findById(projectId)
        if( project.user.toString() !== userId.toString()){
            throw new ApiError("UnAuthorized to Update" , 403)
        }
        const updatedProject = await ProjectModel.findByIdAndUpdate(projectId , projectData , {
            new : true,
            runValidators : true
        })
        return updatedProject
    } catch (error) {
        throw error
    }
}


exports.getProjectById = async(userId , projectId) => {
    try {
        const project = await ProjectModel.findById(projectId)
        if(project.user.toString() !== userId.toString()){
            throw new ApiError("Anauthorized to show data" , 403)
        }
        return project
    } catch (error) {
        throw error
    }
}


exports.deleteProject = async(userId , projectId) => {
    try {
      const project = await ProjectModel.findById(projectId)
      if(!userId || !projectId){
        throw new ApiError("please login")
      }
      if(project.user.toString() !== userId.toString()){
        throw new ApiError("Anauthorized to delete this project")
      }
      await TaskModel.deleteMany({project : projectId})
      await ProjectModel.findByIdAndDelete(projectId)
    } catch (error) {
      throw error
    } 
}
