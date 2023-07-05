import React, { useState, useEffect } from 'react';
import 'tachyons';
import ProjectButton from './ProjectButton';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../Features/ProjectsSlice';
import './Home.css';
import Slider from 'react-slick';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5}
];

function ProjectScreen() {
  const [searchField, setSearchField] = useState("");
  const { data, loading, error } = useSelector((state) => state.projects);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);
  
  const filteredProjects = data.filter(
    project => project.projectname.toLowerCase().includes(searchField.toLowerCase())
  );
  
  if (loading) {
    return (
      <div class="text-center my-auto">
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div class="spinner-border" role="status">
        </div>
        <br/>
        <span>Loading....</span>
      </div>
    )
  }
  if (error) {
    return <h2>Oops Something wrong..</h2>;
  }
  
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...arrowStyle
          // right: '0px', // Adjust the position of the right arrow
        }}
      />
    );
  };

  const arrowStyle = {
    background: 'rgb(199, 206, 207)',
    borderRadius: '80%',
    transform: 'scale(2.3)', // Update the scale value to increase the size
  };

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed:1000,
    prevArrow: <CustomNextArrow />,
    nextArrow: <CustomNextArrow />,
};
  return (
    <div>
    <center>
      
    <section className="garamond">
      <div className='Project-row-container IssueStatusBar-background-color'>

        <div className="Project-icon-container">
          <ProjectButton />
        </div>

        <div className='Project-heading-container'>
          <h2>Projects</h2>
        </div>

        
      <div className="Project-align">
        <input className="pa2 bb br3  ma2 shadow " type="text" placeholder="Search Project" onChange={handleChange}
        />
      </div>

      </div>

      <div className='mt-4'>
       <br/>
      <div className="carousel-wrapper">
      <Slider {...settings}>
        {filteredProjects.map((val) => (
          <ProjectCard
            key={val.projectId}
            project={val}
          />  
        ))} 
      </Slider>
     </div>
      </div>
    </section>
    </center>
    </div>
  );
  }


export default ProjectScreen;  
