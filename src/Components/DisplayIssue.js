// import React, { useState } from 'react';

// const DisplayIssue = ({ issueId}) => (
//   <div className="left-component" style={{ width: '75%' }}>
//     <h2>Left Component</h2>
//     {
//       <div>
//         <p>Value 1: {issueId}</p>
//       </div>
//     }
//   </div>
// );

// export default DisplayIssue;

import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from "react-redux";
import { GetIssueById} from '../Features/IssueSlice'
import { GetEmployeeById } from '../Features/Employees';


function DisplayIssue({selectedIssueId}) {
    console.log("DisplayIssue",selectedIssueId)
    const dispatch = useDispatch();
    //console.log(data);
    useEffect(() => {
        dispatch(GetIssueById(selectedIssueId));
      }, [selectedIssueId]);
    const { dataById, loading, error } = useSelector((state) => state.issues);

    // const employeeData = useSelector((state) => state);
    // useEffect(() => {
    //     dispatch(GetEmployeeById());
    // }, [])
   
   
    if(loading){
        return <h2>Loading.........</h2>
    }
    if(error !== null){
        return <h2>Oops something went wrong...</h2>
    }
    
    if(dataById.length!==0){
    return (
        <div className="left-component" style={{ width: '75%' }}>
            <p>Issue :{dataById[0].issueName}</p>     
           
            <div className='each-field'>
                <label>Issue Type : </label>
                <div className='each-field-value'>
                    {dataById[0].issueType}
                </div>
            </div>
            <div className='each-field'>
                <label>Project Id : </label>
                <div className='each-field-value'>
                    {dataById[0].projectId}
                </div>
            </div>
            <div className='each-field'>
                <label>Module Name : </label>
                <div className='each-field-value'>
                    {dataById[0].moduleName}
                </div>
            </div>
            <div className='each-field'>
                <label>Description : </label>
                <div className='each-field-value'>
                    {dataById[0].description}
                </div>
            </div>
            <div className='each-field'>
                <label>Assigned Employee : </label>
                <div className='each-field-value'>
                    {dataById[0].assignTo}
                    {/* Need to pass assignTo to GetEmployeeById() api and render the employee name
                        assignTo contains the employee id
                    */}
                    {/* 
                        {employeeData.employee.empName}
                    */}

                </div>
            </div>
            <div className='each-field'>
                <label>Steps to Reproduce : </label>
                <div className='each-field-value'>
                    {dataById[0].stepsToReproduce}
                </div>
            </div>
            <div className='each-field'>
                <label>Testing Type  : </label>
                <div className='each-field-value'>
                    {dataById[0].testingType}
                </div>
            </div>
            <div className='each-field'>
                <label>Iteration Number : </label>
                <div className='each-field-value'>
                    {dataById[0].iterationNumber}
                </div>
            </div>
            <div className='each-field'>
                <label>Issue Current Status : </label>
                <div className='each-field-value'>
                    {dataById[0].status}
                </div>
            </div>
            <div className='each-field'>
                <label>Previous Issue : </label>
                <div className='each-field-value'>
                    {dataById[0].linkToPast}
                </div>
            </div>

        </div>
    )
    }
}

export default DisplayIssue 

