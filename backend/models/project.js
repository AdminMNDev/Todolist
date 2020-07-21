const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    password: { type: String, required: true },
    todo: {type: Array, required: false}
})
module.exports = mongoose.model('Project', projectSchema)