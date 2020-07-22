const express = require('express')
const router = express.Router()
const projectsCtrl = require('../Controllers/projects')

router.get('/', projectsCtrl.projects)
router.get('/id/:id', projectsCtrl.findOneProject)
router.post('/add', projectsCtrl.newProject)

module.exports = router