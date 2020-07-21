const Project = require('../models/project')

exports.projects = (req, res) => {
    Project.find()
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(400).json({error}))
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