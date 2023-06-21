import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetEmployeeByProjectId, fetchEmployees} from '../Features/EmployeeSlice';

function EmployeeDropdown({val, callBackFunc}) {
    const [value, setValue] = React.useState();
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useSelector((state) => state.employees);
    const projectId = useSelector((state) => state.selectedFields.selectedProjectId);
    
    useEffect(() => {
      // console.log("projectId inside dropdown : ", projectId);
        dispatch(GetEmployeeByProjectId(projectId))
        .then((response) => {
            // console.log("Result",response);
            if(response.payload){ 
              dispatch(GetEmployeeByProjectId(projectId));
            }
          })
        .catch(error => {
            console.error('Error updating bug status:', error);
          });
          setIsDataLoaded(true);
        // setValue1(data[0].empName)
    }, [val])
    if(isLoading){
      return <select></select>
    }
    if(isError){
      return <p>Servers are busy...</p>
    }

    const setFunc = (event) => {
      console.log("event : ", event);
      callBackFunc(event.target.value);
    }

    if(isDataLoaded){
        if(val==null){
            val = data[0].empId;
        }
    }

    if(isDataLoaded){
        return (
            <>
              {/* {console.log(data)} */}
              {/* {data.map((val,ind) => (
                console.log(val)
              ))} */}
            <select
              disabled={isLoading}
              value={value}
                onChange={setFunc}
            >
              {data.map((val,ind) => (
                <option key={val.empId} value={val.empId}>
                  {val.empName}
                </option>
              ))}
            </select>
            </>
          );
    }
  
}

export default EmployeeDropdown;