import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchEmployees} from '../Features/EmployeeSlice';

function EmployeeDropdown({val, callBackFunc}) {
    const [value, setValue] = React.useState();
    const dispatch = useDispatch();
    const {data, isLoading, isError} = useSelector((state) => state.employees);
    useEffect(() => {
        dispatch(fetchEmployees())
        .then((response) => {
            //console.log("Result",response);
            //console.log('Issue status updated successfully');
            if(response.payload){ 
              dispatch(fetchEmployees());
            }
          })
        .catch(error => {
            console.error('Error updating bug status:', error);
          });
        // setValue1(data[0].empName)
    }, [val])
    if(isLoading){
      return <select></select>
    }
    if(isError){
      return <p>Servers are busy...</p>
    }

    if(data!=null){
        if(val==null){
            val = data[0].empId;
        }
    }

    if(data != null){
        return (
            <>
              {/* {console.log(data)} */}
              {/* {data.map((val,ind) => (
                console.log(val)
              ))} */}
            <select
              disabled={isLoading}
              value={value}
                onChange={(e) => callBackFunc(e.target.value)}
            >
              {data.map((val,ind) => (
                <option key={ind} value={val.empName}>
                  {val.empName}
                </option>
              ))}
            </select>
            </>
          );
    }
  
}

export default EmployeeDropdown;