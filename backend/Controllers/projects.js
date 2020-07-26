const Project = require('../models/project')
const crypto = require('crypto')

exports.projects = (req, res) => {
    Project.find()
        .then(projects => res.status(200).json(projects))
        .catch(error => res.status(400).json({error}))
}
exports.findOneProject = (req, res) => {
    const password = crypto.createHash('md5').update(req.params.pass).digest('hex');
    Project.findOne({ _id: req.params.id })
        .then(project => {
            if (project.password === password) {
                res.status(200).json({project})
            } else {
                res.status(404).json({
                    message: 'Mauvais mot de passe'
                })
            }
        })
        .catch(error => res.status(404).json({error}))
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
exports.editProject = (req, res) => {
    Project.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(project => res.status(200).json({project}))
        .catch(error => res.status(400).json({error}))
}
exports.deleteProject = (req, res) => {
    Project.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Projets supprimer' }))
        .catch(error => res.status(400).json({error}))
}