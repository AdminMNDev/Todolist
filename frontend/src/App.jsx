import React from 'react';
import { useEffect } from 'react';
import { useProjects } from './hooks/projects';
import { Projects } from './App/Projects';

function App() {
  const {
    projects,
    fetchProjects,
    createProject
  } = useProjects()

  useEffect(() => {
    fetchProjects()
  }, [])

  return <Projects projects={projects} onCreate={createProject}/>
}

export default App;
