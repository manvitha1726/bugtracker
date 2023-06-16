import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../Features/ProjectsSlice';

const ProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleAddProject = () => {
    const data = {
      projectname: projectName,
    };
    dispatch(addNewProject(data));

    setProjectName('');
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenPopup}>Add Project</button>

      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Enter Project Name</h2>
            <input
              type="text"
              value={projectName}
              onChange={handleInputChange}
            />
            <button onClick={handleAddProject}>Add</button>
            <button onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectButton;
