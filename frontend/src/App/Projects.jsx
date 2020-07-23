import React from 'react';
import { Loader } from '../UI/Loader';
import { useState } from 'react';
import PropTypes from 'prop-types';


export function Projects({ projects, onCreate, onClick }) {
    return <div className='container'>
        <CreateProjectForm onSubmit={onCreate} />
        {projects === null ? <Loader /> : <ProjectsList onClick={onClick} projects={projects} />}
        
    </div>
}
// All our projects
function ProjectsList({ projects, onClick }) {
    const [error, setError] = useState(null)
    return <div>
        {error && <p className='alert alert-danger'>{error}</p>}
        {projects.map(project => <Project key={project._id} project={project} onClick={onClick} setError={setError}/>)}
    </div>
}

function Project({ project, onClick, setError }) {
    const [login, setLogin] = useState(null)
    const handleClick = function () {
        setLogin(true)        
    }
    // If password is not the same, we show an error
    const handlePassword = async function (e) {
        e.preventDefault()
        const response = await onClick(project, e.target.password.value)
        if (response) {
            const error = response.message
            setError(error)
        }
    }
    return <>
        <button className='btn btn-primary' onClick={() => handleClick(project)}>{project.title}</button>
        {login &&
            <form onSubmit={handlePassword}>
                <input type='password' name='password' />
                <input type='submit' />
            </form>}
        </>
}

function CreateProjectForm({ onSubmit }) {
    const handleSubmit = async function (e) {
        e.preventDefault()
        try {            
            await onSubmit(Object.fromEntries(new FormData(e.target)))
            
        } catch (e) {
            console.log(e);
        }
    }
    return <form onSubmit={handleSubmit}>
        <input type='text' name='title' />
        <input type='password' name='password' />
        <button type='submit'>Nouveau projet</button>
    </form>
}

Projects.propTypes = {
    projects: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    
}
ProjectsList.propTypes = {
    projects: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
}
Project.propTypes = {
    project: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
}
CreateProjectForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}