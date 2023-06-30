import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../Features/ProjectsSlice';
import {useNavigate} from 'react-router-dom';

import validateForm from './ProjectFormValidation';
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
      <Button className="addprojectbt" onClick={handleOpenModal}>Add Project</Button>

      <Modal isOpen={isOpen} toggle={handleCloseModal}>
        <ModalHeader  className="modal-header" toggle={handleCloseModal}>Project Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
              <label>Project Id:
              <input type="text" value={projectId} onChange={hadleIdChange} style={{marginLeft:"10px"}} />
                <div className='validations'>
                {errors.projectid && <span>{errors.projectid}</span>}
                </div>
              </label>
              <label>Project Name:
              <input type="text" value={projectName} onChange={handleInputChange} style={{marginLeft:"10px"}} />
                <div className='validations'>
                {errors.projectname && <span>{errors.projectname}</span>}
                </div>
              </label>
          </form>
        </ModalBody>
        <ModalFooter>
          <button onClick={handleSubmit}>Submit</button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProjectButton;
