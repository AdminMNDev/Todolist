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
    updateProject,
    deleteProject
  } = useProjects()

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return <>
    {!project ? <Projects projects={projects} onCreate={createProject} onClick={fetchProject} /> : <Project project={project} onUpdate={updateProject} backToHome={deselectProject} onDelete={deleteProject}/>}
    </>
}

export default App;
 