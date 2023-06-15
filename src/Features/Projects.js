import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects,addNewProject } from './ProjectsSlice'

const Create = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const updateData = (e) => {
    setData({
      ...data,
      [e.target.projectName]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user data...", data);
    dispatch(addNewProject(data));
  
  };

  return (
    <div>
      <h2>Enter the data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="projectName"
            placeholder="enter project name"
            onChange={updateData}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
  };

  const Cards=({project})=>{
    return (
    <div
      className="col-lg-4 mb-3 d-flex align-items-stretch h-100"
      key={project.id}
    >
    
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{project.id}</h5>
          <p className="card-text">{project.name}</p>
        </div>
      </div>
    </div>
    
  );
};
function Projects() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.projects)
  const state = useSelector((state) => state)

  useEffect(() => { 
    dispatch(getAllProjects()) 
  }, [dispatch])
  let content 
  console.log(state.projects)
  if (loading === true) {
    content = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> 
    )
  }
  else if (loading === false) {
    content = data.map((item) => {
      return <Cards project={item} key={item.id} />
    })
  }
  if (state.projects.error !== null) {
    content = (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )
  }
  return <div className="row">{content}</div>
}


export {Projects,Create};