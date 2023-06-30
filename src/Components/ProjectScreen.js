import React, { useState, useEffect } from 'react';
import 'tachyons';
import ProjectButton from './ProjectButton';
import ProjectCard from './ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjects } from '../Features/ProjectsSlice';
// import Pagination from './Pagination/Pagination';
import Carousel from "react-elastic-carousel";
import Slider from 'react-slick';
// import './Home.css'
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

  const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...arrowStyle,
          left: '10px', // Adjust the position of the left arrow
        }}
      />
    );
  };

  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          ...arrowStyle,
          margin:'auto auto',
          right: '10px', // Adjust the position of the right arrow
        }}
      />
    );
  };

  const arrowStyle = {
    width: '25px',
    height: '25px',
    background: 'black', // Change the arrow color here
    borderRadius:'50%'
  };

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    appendDots: (dots) => (
        <div>
          <ul style={{ margin: "0px", padding: "0px" }}>{dots}</ul>
          <style>
            {`
              .slick-dots li button:before {
                color: black; /* Change the arrow color here */
              }
            `}
          </style>
        </div>
      ),
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const filteredProjects = data.filter(project => project.projectname.toLowerCase()
  .includes(searchField.toLowerCase()));
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
      <div className='mt-3'>
      {/* <hr className="seperator" /> */}<br/>
      <div style={{width:'75%'}} >
          
          {/* <Slider {...settings}>
            {
              filteredProjects.map((val) => (
                <ProjectCard
                    key={val.projectId}
                    project={val}
                />
              ))
            }
          </Slider> */}
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

