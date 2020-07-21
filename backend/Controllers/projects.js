const querystring = require('querystring')
const request = require('request')
const Project = require('../models/project')

exports.projects = (req, res) => {
    const allProjects = [
        {
        id: 1
    },
    {
        id: 2
        }
    ]
    JSON.stringify(allProjects)
    res.status(200).json(allProjects)
}
exports.newProject = (req, res) => {
    delete req.body._id
    const project = new Project({
        ...req.body
    })
    project.save()
        .then(() => res.status(201).json({ message: 'Object crée' }))
        .catch(error => res.status(400).json({error}))
}