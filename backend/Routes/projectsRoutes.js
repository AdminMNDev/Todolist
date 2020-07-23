const express = require('express')
const router = express.Router()
const projectsCtrl = require('../Controllers/projects')

router.get('/', projectsCtrl.projects)
router.get('/id/:id/pass/:pass', projectsCtrl.findOneProject)
router.post('/add', projectsCtrl.newProject)
router.put('/id/:id', projectsCtrl.editProject)
router.delete('/id/:id', projectsCtrl.deleteProject)

module.exports = router