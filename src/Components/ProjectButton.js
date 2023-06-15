
import React, { useState } from 'react';

const ProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');

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
    // Perform any action you want with the project name,
    // such as sending it to an API or updating the state.
    console.log(projectName);
    // Reset the input field and close the popup.
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