import React from 'react'
import PropTypes from 'prop-types'

export function Project({ project, backToHome, onUpdate }) {
    console.log(project.todo)

    const handleSubmit = function (e) {
        e.preventDefault()
        const todo = new FormData(e.target)
        todo.append('finished', false)
        todo.append('started', false)
        todo.append('_id', new Date().getTime())
        console.log(Object.fromEntries(todo))
        onUpdate(Object.fromEntries(todo), project)
    }
    return (
        <div>
            <button className='btn btn-danger' onClick={backToHome}>Retour</button>
            <h1>{project.title}</h1>
            <form onSubmit={handleSubmit}>
                <label>Ajouter une nouvelle tache</label>
                <input type='text' name="todo"/>
                <button type='submit'>GO</button>
            </form>
            {project.todo.map(t => <div key={t._id}>
                <p>{t.todo}</p>
                <ul>
                    <li>Commencer: {t.started}</li>
                    <li>Terminer: {t.finished}</li>
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


