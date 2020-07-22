import React from 'react'
import PropTypes from 'prop-types'

export function Project({ project, backToHome }) {
    console.log(project.todo)
    return (
        <div>
            <button className='btn btn-danger' onClick={backToHome}>Retour</button>
            <h1>{project.title}</h1>
            <div>
                <label>Ajouter une nouvelle tache</label>
                <input type='text'/>
            </div>
            {/* MODIFICATION DU TABLEAU DE TACHE DU PROJET ICI */}
        </div>
    )
}

Project.propTypes = {
    project: PropTypes.object.isRequired,
    backToHome: PropTypes.func.isRequired
}


