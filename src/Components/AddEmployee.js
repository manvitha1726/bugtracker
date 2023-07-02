import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { addEmployees } from '../Features/EmployeeSlice';
import {useNavigate} from 'react-router-dom';
import './Home.css';

function AddEmployee({func, projectId}) {
    const [employeeName, setEmployeeName] = useState('');
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const NavigateBackClick = () => {
        navigate(`/`);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const employeeData = {
            empName: employeeName,
            projectId: projectId
        }
        // console.log(employeeData);
        dispatch(addEmployees(employeeData))
        .then((response) => {
            // console.log("Result",response);
            func(response);
          })
        .catch(error => {
            console.error('Error updating bug status:', error);
          });
          handleCloseModal();
        };
    
    return (
        <div className='employee-add-card'>
            <br/>
            <Button
                className='button-background-color'
                onClick={handleOpenModal}
                
            >
                Add Employee
            </Button>
            <Modal
                isOpen={isOpen}
                toggle={handleCloseModal}>
                <ModalHeader
                    className='modal-header'
                    toggle={handleCloseModal}>
                    Employee Details
                </ModalHeader>
                <ModalBody >
                    <form >
                        <div className='field-' >
                            <label>Employee Name: </label>
                            <input
                                type='text'
                                name='employee-name'
                                placeholder='Enter Employee Name'
                                style={{marginLeft: "10px"}}
                                onChange={(e) => setEmployeeName(e.target.value)}
                            />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <button className='button-background-color' onClick={handleSubmit}>Submit</button>{' '}
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default AddEmployee