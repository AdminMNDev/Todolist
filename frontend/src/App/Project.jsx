import React from 'react'
import PropTypes from 'prop-types'

export function Project({ project, backToHome, onUpdate, onDelete }) {
    //set new todo
    const handleAdd = function (e) {
        e.preventDefault()
        const todo = new FormData(e.target)
        todo.append('finished', false)
        todo.append('started', false)
        todo.append('_id', new Date().getTime())
        const updatedProject = { ...project, todo: Object.fromEntries(todo) }
        onUpdate(updatedProject, project, 'PUT')
    }
    // delete the target
    const handleDelete = function (target) {
        let i = null
        const newTodo = [...project.todo ]
        project.todo.map(t => t._id === target._id ? i = project.todo.indexOf(t) : t)
        newTodo.splice(i, 1)
        const updatedProject = { ...project, todo: newTodo }
        onUpdate(updatedProject,project, 'DELETE')
    }
    // change state of the target
    const handleUpdateTo = function (target, type) {
        let i = null
        const updatedTodo = [...project.todo]
        project.todo.map(t => t._id === target._id ? i = project.todo.indexOf(t) : t)
        if (type === 'STARTED') {
            updatedTodo[i].started = true
            const updatedProject = { ...project, todo: updatedTodo }
            onUpdate(updatedProject, project, 'UPDATE')
        } else if (type === 'FINISHED') {
            updatedTodo[i].finished = true
            const updatedProject = { ...project, todo: updatedTodo }
            onUpdate(updatedProject, project, 'UPDATE')
            }
    }
    return (
        <div>
            <button className='btn btn-danger' onClick={backToHome}>Retour</button>
            <h1>{project.title}</h1>
            <form onSubmit={handleAdd}>
                <label>Ajouter une nouvelle tache</label>
                <input type='text' name="todo"/>
                <button type='submit'>GO</button>
            </form>
            
            {project.todo.map(t => <div key={t._id}>
                <p>{t.todo}</p>
                {t.finished === 'false' && 
                    <ul>
                        <li>Commencer: {t.started === true ? 'Oui' : 'Non'}</li>
                        <button className='alert alert-danger' onClick={() => handleDelete(t)}>Supprimer</button>
                        {t.started === true ?
                            <button className='alert alert-success' onClick={() => handleUpdateTo(t, 'FINISHED')}>Terminer</button>
                            :<button className='alert alert-secondary' onClick={() => handleUpdateTo(t, 'STARTED')}>Commencer</button>
                        }
                    </ul>
                }
            </div>)}
            <button onClick={() => onDelete(project)}>delete</button>
        </div>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    backToHome: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}
