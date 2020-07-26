import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../UI/Button'
import { Trash } from '../UI/Trash'
import { Return } from '../UI/Return'
import { Checked } from '../UI/Checked'
import { Start } from '../UI/Start'
import { Add } from '../UI/Add'
import { Field } from '../UI/Field'
import { SmallCact, MediumCact, BigCact } from '../UI/Cactus'

export function Project({ project, backToHome, onUpdate, onDelete }) {
    // For our pourcent
    const [notStarted, setNotStarted] = useState(0)
    const [started, setStarted] = useState(0)
    const [finished, setFinished] = useState(0)
    const [task, setTask] = useState('')
    // Set the pourcent
    useEffect(() => {
        project.todo.map(t => {
            if (t.started === 'false') {
                setNotStarted(s => s + 1)
            } else if (t.started === true && t.finished === 'false') {
                setStarted(s => s + 1)
            } else if (t.finished === true) {
                setFinished(s => s + 1)
            }
        })
    }, [])
    //set new todo
    const handleAdd = function (e) {
        e.preventDefault()
        const todo = new FormData(e.target)
        todo.append('finished', false)
        todo.append('started', false)
        todo.append('_id', new Date().getTime())
        const updatedProject = { ...project, todo: Object.fromEntries(todo) }
        onUpdate(updatedProject, project, 'PUT')
        setNotStarted(s => s + 1)
        setTask('')
    }
    // delete the target
    const handleDelete = function (target) {
        let i = null
        const newTodo = [...project.todo ]
        project.todo.map(t => t._id === target._id ? i = project.todo.indexOf(t) : t)
        newTodo.splice(i, 1)
        const updatedProject = { ...project, todo: newTodo }
        onUpdate(updatedProject, project, 'DELETE')
        if (target.started === 'false') {
            setNotStarted(s => s - 1)
        } else if (target.started === true && target.finished === 'false') {
            setStarted(s => s - 1)
        }
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
            setNotStarted(s => s - 1)
            setStarted(s => s + 1)
        } else if (type === 'FINISHED') {
            updatedTodo[i].finished = true
            const updatedProject = { ...project, todo: updatedTodo }
            onUpdate(updatedProject, project, 'UPDATE')
            setStarted(s => s - 1)
            setFinished(s => s + 1)
            }
    }
    const handleChange = function (e) {
        setTask(e.target.value)
    }
    return (
        <div className='card'>
            <div className='card-header'>
                <Button type='danger' onClick={backToHome}><Return /></Button>
                <h1>{project.title}</h1>
            </div>
            <div className='card-body'>
                <form onSubmit={handleAdd}>
                    <Field type='text' name='todo' value={task} onChange={handleChange} autoComplete='off'>Ajouter une nouvelle tache</Field>
                    <Button htmlType='submit'><Add/></Button>
                </form>
            </div>
            <div className="card-footer">
                <div className='row'>
                    <div className="col-9">
                        {project.todo.map(t => t.started === 'false' && <CardTodo t={t} key={t._id} handleDelete={handleDelete} handleUpdateTo={handleUpdateTo} />)}
                        {project.todo.map(t => t.started === true && t.finished === 'false' && <CardTodo t={t} key={t._id} handleDelete={handleDelete} handleUpdateTo={handleUpdateTo}/>)}
                        {project.todo.map(t => t.finished === true && <CardTodo t={t} key={t._id} handleDelete={handleDelete} handleUpdateTo={handleUpdateTo} />)}
                    </div>
                    <ShowPourcent notStarted={notStarted} started={started} finished={finished} />
                </div>
            </div>
            <Button type='danger' onClick={() => onDelete(project)}><Trash/></Button>
        </div>
    )
}

function CardTodo({ t, handleDelete, handleUpdateTo}) {
    let className = 'secondary'
    let Cact = <SmallCact />
    if (t.started === true) {
        className = 'warning'
        Cact = <MediumCact />
    }
    if (t.finished === true) {
        className = 'success'
        Cact = <BigCact />
    }
    return <div className={'alert alert-' + className} key={t._id}>
        <p>{t.todo}</p>
        <div className='row d-flex justify-content-between'>

        {t.finished === 'false' &&
            <ul>
                <li className='mb-2'>
                    {t.started === true ?
                        <Button type='success' onClick={() => handleUpdateTo(t, 'FINISHED')}><Checked /></Button>
                        :
                        <Button type='secondary' onClick={() => handleUpdateTo(t, 'STARTED')}><Start /></Button>
                    }                
                </li>
                <li>
                    <Button type='danger' onClick={() => handleDelete(t)}><Trash /></Button>
                </li>
            </ul>
            }
            {/* add false p for the space-between */}
            <p></p>
            {Cact}
        </div>
    </div>
}

function ShowPourcent({ notStarted, started, finished }) {
    let allTask = notStarted + started + finished
    let notStartedPourcent = Math.floor((notStarted / allTask * 100))
    let startedPourcent = Math.floor((started / allTask * 100))
    let finishedPourcent = Math.floor((finished / allTask * 100))
    if (isNaN(notStartedPourcent || startedPourcent || finishedPourcent)) {
        notStartedPourcent = 0
        startedPourcent = 0
        finishedPourcent = 0
    }
    return <div className='col-3 float-right'>
        <p className='alert alert-secondary'>{notStartedPourcent} %</p>
        <p className='alert alert-warning'>{startedPourcent} %</p>
        <p className='alert alert-success'>{finishedPourcent} %</p>
    </div>
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    backToHome: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
}
CardTodo.propTypes = {
    t: PropTypes.object.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleUpdateTo: PropTypes.func.isRequired,
}
ShowPourcent.propTypes = {
    notStarted: PropTypes.number.isRequired,
    started: PropTypes.number.isRequired,
    finished: PropTypes.number.isRequired,
}