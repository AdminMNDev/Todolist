import { useReducer } from "react"
import { apiFetch } from "../utils/apiFetch"

function reducer(state, action) {
    console.log('reduce', action.type, action);
    switch (action.type) {
        case 'FETCHING_PROJECTS':
            return {...state, loading: true}
        case 'SET_PROJECTS':
            return { ...state, projects: action.payload, loading: false }
        case 'DELETE_PROJECTS':
            return { ...state, projects: state.projects.filter(i => i !== action.payload) }
        case 'ADD_PROJECTS':
            console.log(action.payload);
            return { ...state, projects: [...state.projects, action.payload] }
        case 'UPDATE_PROJECTS':
            return { ...state, projects: state.projects.map(i => i === action.target ? action.payload : i) }
    }
}

export function useProjects() {
    const [state, dispatch] = useReducer(reducer, {
        projects: null,
        loading: false
    })
    return {
        projects: state.projects,
        fetchProjects: async function () {
            if (state.loading || state.projects) {
                return null
            }
            dispatch({type: 'FETCHING_PROJECTS'})
            const projects = await apiFetch('/projects')
            dispatch({type: 'SET_PROJECTS', payload: projects})
        },
        createProject: async function (data) {
            const newProject = await apiFetch('/projects/add', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            dispatch({type: 'ADD_PROJECTS', payload: newProject})
        }
    }
}