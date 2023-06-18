import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addEmployees } from '../Features/EmployeeSlice';
import Popup from 'reactjs-popup';

function AddEmployee({func, projectId}) {
    const [employeeName, setEmployeeName] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const employeeData = {
            empName: employeeName,
            projectId: projectId
        }
        console.log(employeeData);
        dispatch(addEmployees(employeeData))
        .then((response) => {
            console.log("Result",response);
            func(response);
          })
        .catch(error => {
            console.error('Error updating bug status:', error);
          });
        };
    
    return (
        <div className='employee-add-card'>
            <Popup 
                trigger = {<a style={{border: "1px solid black", padding: "4px"}}>Create new employee</a>}
                position="right center"
            >
                <form onSubmit={handleSubmit}>
                    <div className='field-' >
                        <input
                            type='text'
                            name='employee-name'
                            placeholder='Enter Employee Name'
                            onChange={(e) => setEmployeeName(e.target.value)}
                        />
                        <button type='submit'>Create</button>
                    </div>
                </form>
            </Popup>
        </div>
    )
}

export default AddEmployee