import {React,useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchEmployees,addEmployees} from './EmployeeSlice';


function DisplayEmployees() {

    const dispatch = useDispatch();
    const {data, isLoading, isError} = useSelector((state) => state.employees);
    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])
    //console.log("state: ", state.employee.data);
    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(isError){
        return <h2>Oops Something wrong..</h2>
    }
    return (
        <div>
            {
                data && data.map((val, ind) => <li>{val.title}</li>)
            }
        </div>
    )
}


function AddEmployee() {
    const [employeeName, setEmployeeName] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(employeeName);
        dispatch(addEmployees(employeeName));
        
    };
    
    return (
        <div className='employee-add-card'>
            <h3>Create New Employee</h3>
            <form onSubmit={handleSubmit}>
                <div className='field-' >
                    <input
                        type='text'
                        name='employee-name'
                        placeholder='Enter Employee Name'
                        onChange={(e) => setEmployeeName(e.target.value)}
                    />
                    <button type='submit'>Create Employee</button>
                </div>
            </form>
        </div>
    )
}

export  {AddEmployee,DisplayEmployees}