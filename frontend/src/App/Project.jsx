import React from 'react'
import PropTypes from 'prop-types'

export function Project({ project, backToHome, onUpdate }) {
    project.todo.map(t => t === null ? console.log(true): console.log(false))

    const handleAdd = function (e) {
        e.preventDefault()
        const todo = new FormData(e.target)
        todo.append('finished', false)
        todo.append('started', false)
        todo.append('_id', new Date().getTime())
        onUpdate(Object.fromEntries(todo), project, 'PUT')
    }
    const handleDelete = function (target) {
        let i = null
        const newTodo = [...project.todo ]
        project.todo.map(t => t._id === target._id ? i = project.todo.indexOf(t) : t)
        newTodo.splice(i, 1)
        onUpdate(newTodo,project, 'DELETE')
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
                <ul>
                    <li>Commencer: {t.started}</li>
                    <li>Terminer: {t.finished}</li>
                    <button className='alert alert-danger' onClick={() => handleDelete(t)}>Supprimer</button>
                </ul>
            </div>)}
        </div>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    backToHome: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
}
