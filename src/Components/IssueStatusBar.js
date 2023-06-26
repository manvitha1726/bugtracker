import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateIssueStatus,GetIssueByProjectId } from '../Features/IssueSlice';
import { setSelectedFilters, setSelectedIssueId } from '../Features/SelectedFieldsSlice';
import { FaPlus,FaPencilAlt,FaSort} from 'react-icons/fa';
import { getAllProjects } from "../Features/ProjectsSlice";
import {useNavigate} from 'react-router-dom'; 
import Pagination from './Pagination/Pagination';
import './Home.css';
import EmployeeDropdown from './EmployeeDropdown';

function IssueStatusBar() {     
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.issues);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [sortOrder, setSortOrder] = useState('');
    const [filteredData,setFilteredData]=useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [dataSorted, setDataSorted] = useState(false);
    const [isDataFiltered, setIsDataFiltered] = useState(false);
    const [selectedAssignedEmployee, setSelectedAssignedEmployee] = useState(1);
    const [IdentifiedEmployee, setIdentifiedEmployee] = useState();
    const [isFromLandingPage, setIsFromLandingPage] = useState(true);

    const [issueFilterVal, setIssueFilterVal] = useState({
      status: 'Any',
      identfiedemp:-1,
      assignTo: -1,
      priority: 'Any',
      severity: 'Any'
    });

    const ProjectId = useSelector((state) => state.selectedFields.selectedProjectId);
    const selectedFilters = useSelector((state) => state.selectedFields.selectedFilters);
    // console.log("projectidd",ProjectId);

    useEffect(() => { 
      dispatch(GetIssueByProjectId(ProjectId)) 
    },[])

    const projObj= useSelector((state) => state.projects);
    useEffect(() => {
      dispatch(getAllProjects());
      console.log("selected filters in ISB--", selectedFilters);
      handleFiltersFromLandingPage();
      // console.log("selected filters in ISB---", issueFilterVal);
      handleFilterApply();



      // console.log("projects data",projObj.data);
    }, []);
      
    useEffect(() => {
      // console.log("data : -", data);
      if(!isFromLandingPage){
        const filteredData1 = data.filter(issue => {
          
              const lowerCaseIssueName = issue.issueName.toLowerCase();
              const lowerCaseStatus = issue.status.toLowerCase();
              const lowerCasePriority = issue.priority.toLowerCase();
              const lowerCaseSearchTerm=searchTerm.toLowerCase();
            
              return (
                lowerCaseIssueName.includes(lowerCaseSearchTerm) ||
                lowerCaseStatus.includes(lowerCaseSearchTerm) ||
                lowerCasePriority.includes(lowerCaseSearchTerm)
              );
          
        }); 

      setFilteredData(filteredData1)
    
      setDataLoaded(true);
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      setCurrentPosts(filteredData1.slice(firstPostIndex, lastPostIndex));
    }
    // handleFilterApply();
    }, [data, searchTerm])  

    useEffect(() =>{
      if(dataLoaded){
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      setCurrentPosts(filteredData.slice(firstPostIndex, lastPostIndex));
      setDataSorted(false)
      }
    }, [dataSorted, currentPage])

    useEffect(() =>{
      if(dataLoaded){
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      setCurrentPosts(filteredData.slice(firstPostIndex, lastPostIndex));
      setIsDataFiltered(false);
      }
    }, [isDataFiltered, currentPage])


    useEffect(() => {
      setIssueFilterVal((prevFilters) => ({ ...prevFilters, assignTo: `${selectedAssignedEmployee}` }));
    }, [selectedAssignedEmployee]);
  
    useEffect(() => {
      setIssueFilterVal((prevFilters) => ({ ...prevFilters, identfiedemp: `${IdentifiedEmployee}` }));
    }, [IdentifiedEmployee]);


    const handleFiltersFromLandingPage = () => {
      if(selectedFilters!==null){
        setIssueFilterVal(selectedFilters)
        // setFiltersFromLandingPage(true);
      }
    }

    const handleSort = () => {
        const sortedData = [...filteredData].sort((a, b) => {
        const priorityOrder = { Low: 1, Medium: 2, High: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      if(sortOrder == "asc"){
        sortedData.reverse();
        setSortOrder("dsc");
      }
      else{
        setSortOrder("asc");
      }
      setFilteredData(sortedData);
      setDataSorted(true)
    };
     
    const handleStatusSort = () => {
      const sortedData = [...filteredData].sort((a, b) => {
      const priorityOrder = { Open: 1, Hold: 2, "In Progress": 3 , Close: 4};
        return priorityOrder[a.status] - priorityOrder[b.status];
      });
      if(sortOrder == "asc"){
        sortedData.reverse();
        setSortOrder("dsc");
      }

      else{
        setSortOrder("asc");
      }
      setFilteredData(sortedData);
      setDataSorted(true)
    };
    const handlePlusIconClick = () => {
      navigate(`/projects/${ProjectId}/AddIssue`);
    };
    const handleEditIcon = (issueId) => {
      dispatch(setSelectedIssueId(issueId));
      navigate(`/projects/${ProjectId}/EditIssue${issueId}`);
    };
    
   
    // console.log(data);
    const handleStatusChange = (issueId, status) => {
        dispatch(updateIssueStatus({ issueId, status }))
          .then((response) => {
            // console.log("Result",response);
            // console.log('Issue status updated successfully');
            if(response.payload){ 
              dispatch(GetIssueByProjectId(ProjectId));
            }
          })
          .catch(error => {
            console.error('Error updating bug status:', error);
          });
     };
  
     const handleFilterChange = (event) => {
      const { name, value } = event.target;
      setIssueFilterVal((prevFilters) => ({ ...prevFilters, [name]: value }));
     }
     const handleFilterApply = () => {
      console.log("filters : ", selectedFilters);
      
      const filtered = data.filter(issue => {
        // Check if each field in issueFilterVal matches the corresponding issue property
        var status = 'Any', identfiedemp = -1, assignTo = -1, priority = 'Any', severity = 'Any';
        if(selectedFilters!==null){
          status = selectedFilters.status;
          identfiedemp = selectedFilters.identfiedemp;
          assignTo = selectedFilters.assignTo;
          priority = selectedFilters.priority;
          severity = selectedFilters.severity;
          dispatch(setSelectedFilters(null));
        }
        else{
          status = issueFilterVal.status;
          identfiedemp = issueFilterVal.identfiedemp;
          assignTo = issueFilterVal.assignTo;
          priority = issueFilterVal.priority;
          severity = issueFilterVal.severity;
        }
        console.log(status, identfiedemp, assignTo, priority, severity);
        {console.log("iss11", issue);}
        if (
          (status === 'Any' || issue.status === status) &&
          (identfiedemp === "undefined" || identfiedemp == -1 || issue.identfiedemp == identfiedemp) &&
          (assignTo === '1' || assignTo == -1 || issue.assignTo == assignTo) &&
          (priority === 'Any' || issue.priority === priority) &&
          (severity === 'Any' || issue.severity === severity)
        ) {
          return true; // Include issue in the filtered list
        }
        return false; // Exclude issue from the filtered list
      });
      console.log("filtered : ", filtered);
      setDataLoaded(true)
      setFilteredData(filtered);
      setIsDataFiltered(true);
        
     }

     const NavigateToSelectedIssue = (issueId) => {
      console.log(issueId);
      dispatch(setSelectedIssueId(issueId));
      navigate(`/projects/${ProjectId}/display-issue${issueId}`);
     }

     const handleSearch = (event) => {
      setSearchTerm(event.target.value)
      setIsFromLandingPage(false);
     }

     const handleFilterReset = () => {
        setFilteredData(data);
        setIsDataFiltered(true);
     }

  if(loading){
    return <h1>Loading...</h1>
   }

  if(error){
    return <h2>Oops Something wrong..</h2>
   }
   
  if(dataLoaded){
      return (
        <div className='Mains-Container'>
         <div className="row-container">
              
                <div className="icon-container">
                  <FaPlus className="icon rounded p-1" style={{ backgroundColor: "black",height:'25px',width:'25px',color:'white',marginLeft:'80px',}} onClick={handlePlusIconClick} />
                  <p style={{color:'black ',marginLeft:'80px'}}>Add Issue</p>
                
              </div>
              <div className='heading-container'>
                <h1 className='text-center'>{projObj.data[ProjectId-1].projectname} Issues</h1>
              </div>
              <div className='align'>
                <input className="pa2 bb br3 ma2 shadow" type="text" placeholder="Search Issue" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
          </div>



          <div className='filters' >
            <h5  style={{"font-family":"'Trebuchet MS'"}}>Filter</h5>
              
              <div className='filter-row' style={{display:'flex', flexDirection:'row'}}>
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Status</label>
                    <select 
                      name='status'
                      value={issueFilterVal.status}
                      onChange={handleFilterChange}
                    >
                      <option value="Any">Any</option>
                      <option value="Open">Open</option>
                      <option value="Close">Closed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Hold">Hold</option>
                    </select>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Priority</label>
                    <select 
                      name='priority'
                      value={issueFilterVal.priority|| 'Any'}
                      onChange={handleFilterChange}
                    >
                      <option value="Any">Any</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Severity</label>
                    <select 
                      name='severity'
                      value={issueFilterVal.severity|| 'Any'}
                      onChange={handleFilterChange}
                    >
                      <option value="Any">Any</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                      <option value="S3">S4</option>
                    </select>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Identfied by</label>
                    <EmployeeDropdown callBackFunc={setIdentifiedEmployee} />
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Assigned Employee</label>
                    <EmployeeDropdown callBackFunc={setSelectedAssignedEmployee} employeeFromFiltersLandingPage={issueFilterVal.assignTo} />
                </div>                
              </div>
              <br />
              <div>
              <button onClick={handleFilterApply}>Apply Filters</button>
              &nbsp;&nbsp;&nbsp;
              <button onClick={handleFilterReset}>Reset</button>
              </div>
          
          </div>

          <div className='Issue-table'>
          <table className="table table-bordered rounded-lg">
            <thead>
              <tr>
                <th className='p-3 text-center' style={{backgroundColor:"rgb(199, 206, 207)"}}>Issue</th>
                <th className='p-3 text-center'  style={{backgroundColor:"rgb(199, 206, 207)"}}>Status &nbsp; <FaSort onClick={handleStatusSort}/></th>
                <th className='p-3 text-center' style={{backgroundColor:"rgb(199, 206, 207)"}}>Priority &nbsp;<FaSort onClick={handleSort}/></th>
                <th className='p-3 text-center'  style={{backgroundColor:"rgb(199, 206, 207)"}}>Severity</th>
              
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(issue => ( 
                <tr key={issue.issueId}>
                  <td className='p-3 table-1stcol' style={{position:"relative"}}>
                    <a onClick={() => NavigateToSelectedIssue(issue.issueId)} className='clickable-'>
                        {issue.issueName}
                    </a> &nbsp;&nbsp;&nbsp;
                    <FaPencilAlt className='pointer-icon'  onClick={() => handleEditIcon(issue.issueId)}/>
                  </td>
                  <td className='p-3'> 
                    {issue.status}
                    {/* <center>
                    <select 
                      value={issue.status|| 'Open'}
                      onChange={e => handleStatusChange(issue.issueId, e.target.value)}
                    >
                      <option value="Open">Open</option>
                      <option value="Close">Closed</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Hold">Hold</option>
                    </select>
                    </center>  */}
                  </td>
                  <td className='p-3'>
                    {issue.priority}
                  </td>
                  
                  <td >
                    Will display severity here
                  {/* <center>
                  <FaEye className='pointer-icon' onClick={() => handleViewIcon(issue.issueId)} /></center> */}
                  </td>
                  
                </tr>
              ))}
              
              </tbody>
            </table>
            <Pagination
                  totalPosts={filteredData.length}
                  postsPerPage={postsPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
          </div>
        </div>
      );
  }
}

export default  IssueStatusBar; 