import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateIssueStatus,GetIssueByProjectId } from '../Features/IssueSlice';
import { setSelectedFilters, setSelectedIssueId } from '../Features/SelectedFieldsSlice';
import { FaPlus ,FaEye,FaPencilAlt,FaSort, FaImage} from 'react-icons/fa';
import { getAllProjects, getProjectNameProjectId } from "../Features/ProjectsSlice";
import {useNavigate} from 'react-router-dom'; 
import Pagination from './Pagination/Pagination';
import './Home.css';
import EmployeeDropdown from './EmployeeDropdown';
import ImageCarouselModal from './ImageCarouselModal.js';
import { Table } from 'react-bootstrap';

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
    const [selectedAssignedEmployee, setSelectedAssignedEmployee] = useState();
    const [IdentifiedEmployee, setIdentifiedEmployee] = useState();
    const [isFromLandingPage, setIsFromLandingPage] = useState(true);
    const [issueFilterVal, setIssueFilterVal] = useState({
      status: 'Any',
      identfiedemp:-1,
      assignTo: -1,
      priority: 'Any',
      seviority: 'Any'
    });

    const ProjectId = useSelector((state) => state.selectedFields.selectedProjectId);
    const selectedFilters = useSelector((state) => state.selectedFields.selectedFilters);
    // console.log("projectidd",ProjectId);

    useEffect(() => { 
      dispatch(GetIssueByProjectId(ProjectId)) 
    },[])

    const projObj= useSelector((state) => state.projects);
    useEffect(() => {
      dispatch(getProjectNameProjectId(ProjectId));
      handleFiltersFromLandingPage();
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
      // handleSettingCarouselImages(filteredData1.slice(firstPostIndex, lastPostIndex));
    }
    // handleFilterApply();
    }, [data, searchTerm])  

    useEffect(() =>{
      if(dataLoaded){
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      setCurrentPosts(filteredData.slice(firstPostIndex, lastPostIndex));
      setDataSorted(false)
      // handleSettingCarouselImages(filteredData.slice(firstPostIndex, lastPostIndex));
      }
    }, [dataSorted, currentPage])

    useEffect(() =>{
      if(dataLoaded){
      const lastPostIndex = currentPage * postsPerPage;
      const firstPostIndex = lastPostIndex - postsPerPage;
      setCurrentPosts(filteredData.slice(firstPostIndex, lastPostIndex));
      setIsDataFiltered(false);
      // handleSettingCarouselImages(filteredData.slice(firstPostIndex, lastPostIndex));
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
      // console.log("filters : ", selectedFilters);
      {console.log("selectedAssignedEmployee,", selectedAssignedEmployee);}
      // {console.log("IdentifiedEmployee : ", selectedAssignedEmployee);}
      const filtered = data.filter(issue => {
        // Check if each field in issueFilterVal matches the corresponding issue property
        var status = 'Any', identfiedemp = -1, assignTo = -1, priority = 'Any', seviority = 'Any';
        if(selectedFilters!==null){
          status = selectedFilters.status;
          identfiedemp = selectedFilters.identfiedemp;
          assignTo = selectedFilters.assignTo;
          priority = selectedFilters.priority;
          seviority = selectedFilters.severity;
          dispatch(setSelectedFilters(null));
        }
        else{
          status = issueFilterVal.status;
          identfiedemp = issueFilterVal.identfiedemp;
          assignTo = issueFilterVal.assignTo;
          priority = issueFilterVal.priority;
          seviority = issueFilterVal.seviority;
        }
        console.log(status.toString(), identfiedemp.toString(), assignTo.toString(), priority.toString(), seviority.toString());
        {console.log("iss11", issue);}
        // {console.log(`${issue.assignTo}`, assignTo, `${issue.identfiedemp}` == identfiedemp);}
        // {console.log("as1 : ", assignTo === '1' , assignTo == -1  , issue.assignTo == assignTo, `${issue.assignTo}`, assignTo, assignTo, 'null' === null)}
        if (
          (status === 'Any' || issue.status === status) &&
          (identfiedemp === "undefined" ||  identfiedemp == -1 || issue.identfiedemp == identfiedemp) &&
          (assignTo === 'undefined' || assignTo == -1  || ((issue.assignTo == null) && assignTo == 0) || issue.assignTo == assignTo) &&
          (priority === 'Any' || issue.priority === priority) &&
          (seviority === 'Any' || issue.seviority === seviority)
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
        setIssueFilterVal({
          status: 'Any',
          identfiedemp:-1,
          assignTo: -1,
          priority: 'Any',
          seviority: 'Any'
        })
        setIsDataFiltered(true);
     }

  if(loading){
    return (
      <div class="text-center my-auto">
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div class="spinner-border" role="status">
        </div>
        <br/>
        <span>Loading....</span>
      </div>
    )
   }

  if(error){
    return <h2>Oops Something wrong..</h2>
   }
   
  if(dataLoaded){
      return (
        <div className='Mains-Container'>
         <div className="row-container IssueStatusBar-background-color">
              
              <div className="icon-container">
                  <button className="button-background-color" onClick={handlePlusIconClick}>Add Issue</button>
              </div>
              <div className='heading-container'>
                <h3>{projObj.projectname} Issues</h3>
              </div>
              <div className='align'>
                <input className="pa2 bb br3 ma2 shadow" type="text" placeholder="Search Issue" value={searchTerm} onChange={handleSearch} />
              </div>
          </div>



          <div className='filters' >
            <h5  style={{"font-family":"'Trebuchet MS'"}}>Filter</h5>
              
              <div className='filter-row' style={{display:'flex', flexDirection:'row'}}>
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Status</label>
                    <select className='IssueStatusBar-background-color'
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
                    <select className='IssueStatusBar-background-color'
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
                    <select className='IssueStatusBar-background-color'
                      name='seviority'
                      value={issueFilterVal.seviority|| 'Any'}
                      onChange={handleFilterChange}
                    >
                      <option value="Any">Any</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                      <option value="S4">S4</option>
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
              <button className='button-class button-background-color' onClick={handleFilterApply}>Apply Filters</button>
              &nbsp;&nbsp;&nbsp;
              <button className='button-class button-background-color' onClick={handleFilterReset}>Reset</button>
              </div>
          
          </div>

          <div>
          <table className="table table-bordered">
            <thead>
              <tr className='IssueStatusBar-background-color'>
                <th className='p-3 text-center' >Issue</th>
                <th className='p-3 text-center'>Status &nbsp; <FaSort className='clickable-element' onClick={handleStatusSort}/></th>
                <th className='p-3 text-center '>Priority &nbsp;<FaSort className='clickable-element' onClick={handleSort}/></th>
                <th className='p-3 text-center'>Severity</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((issue, index) => ( 
                <tr key={issue.issueId}>
                  <td className='p-3 table-1stcol' style={{position:"relative"}}>
                    <div className='row-'>

                        <a onClick={() => NavigateToSelectedIssue(issue.issueId)} className='clickable-'>
                            {issue.shortDescription}
                        </a> &nbsp;&nbsp;&nbsp;
                        <div className='pointer-icon1'>
                            <ImageCarouselModal images={issue.images} />
                        </div>
                        <FaPencilAlt className='pointer-icon2' onClick={() => handleEditIcon(issue.issueId)}/>
                    </div>
                  </td>
                  <td className='p-3'> 
                    {issue.status}
                  </td>
                  <td className='p-3'>
                    {issue.priority}
                  </td>
                  
                  <td >
                    {issue.seviority}
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