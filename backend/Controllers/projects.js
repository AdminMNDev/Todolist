const Project = require('../models/project')
const crypto = require('crypto')

exports.projects = (req, res) => {
    Project.find()
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(400).json({error}))
}
exports.newProject = (req, res) => {
    delete req.body._id
    const passHash = crypto.createHash('md5').update(req.body.password).digest('hex')
    const project = new Project({
        ...req.body, password: passHash
    })
    project.save()
        .then(() => res.status(201).json(project))
        .catch(error => res.status(400).json({error}))
}