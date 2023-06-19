import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addNewProject } from '../Features/ProjectsSlice';
import {useNavigate} from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import validateForm from './formValidation';
import './IssueForm.css'
import './Home.css';
const ProjectButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [errors,setErrors]= useState({});
  const [issues,setIssues]= useState([]);
   const data = {
    projectname:projectName,
};
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };
  const NavigateBackClick = () => {
       navigate(`/`);
   };

  const handleSubmit = (event) => {
    setIssues([...issues, data]);
    dispatch(addNewProject(data));
    console.log(projectName);
    const formErrors = validateForm(data);
    if (formErrors){
      setErrors(formErrors);
      handleCloseModal();
      return;
    }
    handleCloseModal();
  };

  return (
    <div>
      <FaArrowLeft className='pointer-icon' onClick={NavigateBackClick}/> &nbsp;&nbsp;&nbsp;
      <Button className="addprojectbt" onClick={handleOpenModal}>Add Project</Button>

      <Modal isOpen={isOpen} toggle={handleCloseModal}>
        <ModalHeader  className="modal-header" toggle={handleCloseModal}>Project Details</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
              <label htmlFor="projectName">Project Name:</label>
              <input type="text" value={projectName} id="projectName" onChange={handleInputChange} style={{marginLeft:"10px"}} />
              <div className="validations">
                   {errors.projectName && <span>{errors.projectName}</span>}
              </div>
              
          </form>
        </ModalBody>
        <ModalFooter>
          <Button className="addprojectbt" onClick={handleSubmit}>Submit</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProjectButton;
