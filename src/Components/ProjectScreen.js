import React, { useState, useEffect } from 'react';
import 'tachyons';
import ProjectButton from './ProjectButton';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../Features/ProjectsSlice';
import Dummy from './Dummy';

function ProjectScreen({onProjectClick}) {
  const [searchField, setSearchField] = useState("");
  const { data, isLoading, isError } = useSelector((state) => state.projects);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h2>Oops Something wrong..</h2>;
  }

  const filteredProjects = data.filter((project) => {
    return (
      project.projectname.toLowerCase().startsWith(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleCardClick = (projectId) => {
    onProjectClick(projectId);
  };

  // if (selectedProjectId) {
  //   return <Dummy ProjectId={selectedProjectId}/>;
  // }

  return (
    <section className="garamond">
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Projects</h2>
      </div>

      <br></br>

      <ProjectButton />

      <div className="pa2">
        <input
          className="pa3 bb br3 b--none bg-lightest-blue ma3"
          type="search"
          placeholder="Search Project"
          onChange={handleChange}
        />
      </div>

      {filteredProjects.map((val, ind) => (
        <ProjectCard
          key={val.projectid}
          project={val}
          onCardClick={handleCardClick}
        />
      ))}
    </section>
  );
}

export default ProjectScreen;