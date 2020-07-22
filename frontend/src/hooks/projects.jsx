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
        case 'FETCHING_PROJECT':
            return {...state, projectId: action.payload._id}
        case 'SET_PROJECT':
            return {
                ...state,
                projects: state.projects.map(p => p._id === action.payload._id ? action.payload : p)
            }
        case 'DESELECT_PROJECT':
            return {
                ...state, projectId: null
            }
        default: 
            throw new Error('Action incoonue ' + action.type)
    }
}

export function useProjects() {
    const [state, dispatch] = useReducer(reducer, {
        projects: null,
        loading: false,
        projectId: null
    })
    const project = state.projects ? state.projects.find(r => r._id === state.projectId) : null
    return {
        projects: state.projects,
        project: project,
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
        },
        fetchProject: async function (project) {
            dispatch({type: 'FETCHING_PROJECT', payload: project})
            const oneProject = await apiFetch('/projects/id/' + project._id)
            dispatch({ type: 'SET_PROJECT', payload: oneProject })
        },
        deselectProject: async function () {
            dispatch({type: 'DESELECT_PROJECT'})
        }
    }
}