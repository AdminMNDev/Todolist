import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../UI/Button'
import { Trash } from '../UI/Trash'
import { Return } from '../UI/Return'
import { Checked } from '../UI/Checked'
import { Start } from '../UI/Start'
import { Add } from '../UI/Add'
import { Field } from '../UI/Field'

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
        <div className='card'>
            <div className='card-header'>
                <Button type='danger' onClick={backToHome}><Return /></Button>
                <h1>{project.title}</h1>
                
            </div>
            <div className='card-body'>
                <form onSubmit={handleAdd}>
                    <Field type='text' name='todo'>Ajouter une nouvelle tache</Field>
                    <Button htmlType='submit'><Add/></Button>
                </form>
            </div>
            <div className="card-footer">
                    {project.todo.map(t => <div key={t._id}>
                    <p>{t.todo}</p>
                    {t.finished === 'false' && 
                        <ul>
                        <li>Commencer: {t.started === true ? 'Oui' : 'Non'}</li>
                        <Button type='danger' onClick={() => handleDelete(t)}><Trash/></Button>
                        {t.started === true ?
                            <Button type='success' onClick={() => handleUpdateTo(t, 'FINISHED')}><Checked/></Button>
                            :
                            <Button type='secondary' onClick={() => handleUpdateTo(t, 'STARTED')}><Start/></Button>
                            }
                        </ul>
                    }
                </div>)}
            </div>
            
            
            <Button type='danger' onClick={() => onDelete(project)}><Trash/></Button>
        </div>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    backToHome: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}
