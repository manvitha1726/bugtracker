import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../Features/ProjectsSlice';
import { FaArrowLeft } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import './Home.css';

const ProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };
  const NavigateBackClick = () => {
    navigate(`/`);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    const data = {
      projectname: projectName,
    };
    dispatch(addNewProject(data));

    setProjectName('');
    setIsOpen(false);
  };

  return (
    <div>
      <FaArrowLeft onClick={NavigateBackClick}/> &nbsp;&nbsp;&nbsp;
      <button className="addprojectbt" onClick={handleOpenPopup}>Add Project</button>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>Enter Project Name</p>
            <input className='addbox'
              type="text"
              value={projectName}
              onChange={handleInputChange}
            /> 
            <button className="space ml1 mr1 bg-green"onClick={handleAddProject}>Add</button>
            <button className="space ml1 bg-light-red" onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectButton;
