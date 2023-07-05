import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../Features/ProjectsSlice';
import {useNavigate} from 'react-router-dom';
import validateForm from './ProjectFormValidation';
import './Home.css';

const ProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors,setErrors]= useState({});

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };

  const hadleIdChange = (event) => {
    setProjectId(event.target.value);
  };

  const handleSubmit = (event) => {
    const data = {
        projectid: projectId,
        projectname: projectName,
    };
    console.log("data - b : ", data);
    const formErrors = validateForm(data);
    console.log("form errors : ", formErrors);
      if (formErrors){
        setErrors(formErrors);
        return;
      }
      console.log("data", data);
      dispatch(addNewProject(data));
      // console.log(projectName);
      handleCloseModal();
  }; 

  return (
    <div>
      <button className="button-background-color" onClick={handleOpenModal}>Add Project</button>

      <Modal isOpen={isOpen} toggle={handleCloseModal}>
        <ModalHeader  className="modal-header" toggle={handleCloseModal}>Enter Project Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className='add-project-col'>
              <div className="Project-form-label">
                <label>Project Id:</label>
              </div>
              <div className="Project-form-control">
                <input  type="text" value={projectId} onChange={hadleIdChange} style={{marginLeft:"10px"}} />
                  <div className='validations'>
                  {errors.projectid && <span>{errors.projectid}</span>}
                  </div>
                </div>
            </div>  
            <div className='add-project-col'>
            <div className="Project-form-label">
              <label >Project Name:</label>
            </div>
            <div className="Project-form-control">
              <input type="text" value={projectName} onChange={handleInputChange} style={{marginLeft:"10px"}} />
                <div className='validations'>
                {errors.projectname && <span>{errors.projectname}</span>}
                </div>
            </div>
            </div>  
          </form>
        </ModalBody>
        <ModalFooter>
          <button className='button-background-color' onClick={handleSubmit}>Submit</button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProjectButton;
