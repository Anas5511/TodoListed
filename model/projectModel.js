const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    definition : {
        type : String
    },
    taskCount : {
        type : Number,
        default : 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
})

const projectModel = mongoose.model("project" , projectSchema)

module.exports = projectModel