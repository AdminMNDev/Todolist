import React from 'react';
import { Loader } from '../UI/Loader';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../UI/Button';
import { Unlock } from '../UI/Unlock';
import { Field } from '../UI/Field';


export function Projects({ projects, onCreate, onClick }) {
    return <div className='container'>
        <CreateProjectForm onSubmit={onCreate} />
        {projects === null ? <Loader /> : <ProjectsList onClick={onClick} projects={projects} />}
        
    </div>
}
// All our projects
function ProjectsList({ projects, onClick }) {
    const [error, setError] = useState(null)
    return <div className='card mt-4'>
        <div className="card-header">
            La liste des projets
        </div>
        <div className="card-body">
                {error && <p className='alert alert-danger'>{error}</p>}
                {projects.map(project => <Project key={project._id} project={project} onClick={onClick} setError={setError} />)}
        </div>
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
        <Button type='secondary ml-1 mr-1' onClick={() => handleClick(project)}>{project.title}</Button>
        {login &&
            <form onSubmit={handlePassword} className='mt-2 mb-2'>
                <Field type='password' name='password'>Mot de passe</Field>
                <Button htmlType='submit' type='secondary'><Unlock /></Button>
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
    return  <div className='card mt-4'>
                <div className='card-header'>
                    Nouveau projet
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <Field type='text' name='title'>Nom du projet</Field>
                        <Field type='password' name='password'>Mot de passe</Field>
                        <Button htmlType='submit'>Nouveau projet</Button>
                    </form>
                </div>
                
        </div>
       
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