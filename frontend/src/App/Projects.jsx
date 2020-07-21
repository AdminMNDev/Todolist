import React from 'react';
import { Loader } from '../UI/Loader';

export function Projects({ projects, onCreate }) {
    return <div className='container'>
        {projects === null ? <Loader /> : <ProjectsList projects={projects} />}
        <CreateProjectForm onSubmit={onCreate} />
    </div>
}
function ProjectsList({ projects }) {
    console.log(projects);
    return <ul>{projects.map(project => <Project key={project._id} project={project} />)}</ul>
}
function Project({ project }) {
    return <li>{project.title}</li>
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
        <button type='submit'>Send</button>
    </form>
}