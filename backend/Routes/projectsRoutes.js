const express = require('express')
const router = express.Router()
const projectsCtrl = require('../Controllers/projects')

router.get('/', projectsCtrl.projects)

module.exports = router