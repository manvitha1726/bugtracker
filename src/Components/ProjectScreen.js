import React, { useState, useEffect } from 'react';
import 'tachyons';
import ProjectButton from './ProjectButton';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../Features/ProjectsSlice';
// import Pagination from './Pagination/Pagination';
import Carousel from "react-elastic-carousel";
import './Home.css'
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5}
];

function ProjectScreen() {
  const [searchField, setSearchField] = useState("");
  const { data, loading, error } = useSelector((state) => state.projects);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(5);

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

    // const lastPostIndex = currentPage * postsPerPage;
    // const firstPostIndex = lastPostIndex - postsPerPage;
    // const currentPosts = filteredProjects.slice(firstPostIndex, lastPostIndex);
    
  return (
    <div>
    <center>
    <hr/>
    <section className="garamond">
      <div className='pa1 '>
      <div className="navy georgia grow">
        <h2 className="f2  ">Projects</h2>
      </div></div> 

       <div className='alignright'>
      <ProjectButton /></div>

      <div className="align">
        <input
          className="pa2 bb br3  ma2 shadow "
          type="search"
          placeholder="Search Project"
          onChange={handleChange}
        />
      </div>
      <div className='mt-4'>
      {/* <hr className="seperator" /> */}<br/>
      <div className="carousel-wrapper">
      <Carousel breakPoints={breakPoints}>
      {filteredProjects.map((val) => (
        <ProjectCard
          key={val.projectId}
          project={val}
        />  
      ))}  
      </Carousel>
     </div>
      {/* <Pagination
      totalPosts={filteredProjects.length}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      /> */}
      </div>
    </section>
    </center>
    </div>
  );
  }


export default ProjectScreen;  