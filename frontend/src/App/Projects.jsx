import React from 'react';
import { Loader } from '../UI/Loader';

export function Projects({ projects, onCreate, onClick }) {
    return <div className='container'>
        <CreateProjectForm onSubmit={onCreate} />
        {projects === null ? <Loader /> : <ProjectsList onClick={onClick} projects={projects} />}
        
    </div>
}
function ProjectsList({ projects, onClick }) {
    return <div>{projects.map(project => <Project key={project._id} project={project} onClick={onClick}/>)}</div>
}
function Project({ project, onClick }) {
    const handleClick = function (project) {
        console.log(project);
        onClick(project)
    }
    return <button className='btn btn-primary' onClick={() => handleClick(project)}>{project.title}</button>
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