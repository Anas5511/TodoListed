const mongoose = require('mongoose')


const connectionDb = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB)
        console.log("Mongo DB connection Successfully")
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = connectionDb