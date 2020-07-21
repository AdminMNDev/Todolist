const querystring = require('querystring')
const request = require('request')

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