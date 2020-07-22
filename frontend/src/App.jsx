import React from 'react';
import { useEffect } from 'react';
import { useProjects } from './hooks/projects';
import { Projects } from './App/Projects';
import { Project } from './App/Project';

function App() {
  const {
    projects,
    project,
    fetchProjects,
    fetchProject,
    createProject,
    deselectProject,
  } = useProjects()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return <>
    {!project ? <Projects projects={projects} onCreate={createProject} onClick={fetchProject} /> : <Project project={project} backToHome={deselectProject}/>}
    </>
}

export default App;
