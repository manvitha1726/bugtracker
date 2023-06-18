import React, { useState, useEffect } from 'react';
import 'tachyons';
import ProjectButton from './ProjectButton';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../Features/ProjectsSlice';
import ProjectsPagePagination from './Pagination/ProjectsPagePagination';
import './Home.css'

function ProjectScreen({onProjectClick}) {
  const [searchField, setSearchField] = useState("");
  const { data, loading, error } = useSelector((state) => state.projects);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const filteredProjects = data.filter(project => project.projectname.toLowerCase()
  .includes(searchField.toLowerCase()));
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h2>Oops Something wrong..</h2>;
  }
  
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const handleCardClick = (projectId) => {
    onProjectClick(projectId);
  };

  // if (selectedProjectId) {
  //   return <Dummy ProjectId={selectedProjectId}/>;
  // }
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = filteredProjects.slice(firstPostIndex, lastPostIndex);
    
  return (
    
    <center>
    <section className="garamond">
      <div className='pa1 '>
      <div className="navy georgia ma0 grow">
        <h2 className="f2">Projects</h2>
      </div></div>

      <br></br>
       <div className='alignright'>
      <ProjectButton /></div>

      <div className="align">
        <input
          className="pa1 bb br3  ma2 shadow"
          type="search"
          placeholder="Search Project"
          onChange={handleChange}
        />
      </div>
      <div className='mt-4'>
      {currentPosts.map((val) => (
        <ProjectCard
          key={val.projectid}
          project={val}
          onCardClick={handleCardClick}
        />
      ))}
      <ProjectsPagePagination
      totalPosts={filteredProjects.length}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      /></div>
    </section>
    </center>
  );
  }


export default ProjectScreen;  