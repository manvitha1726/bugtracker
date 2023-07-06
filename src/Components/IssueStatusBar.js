import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getProjectById, getProjectNameProjectId} from '../Features/ProjectsSlice';
import { setSelectedFilters, setSelectedIssueId } from '../Features/SelectedFieldsSlice';
import { FaPlus ,FaEye,FaPencilAlt,FaSort, FaImage} from 'react-icons/fa';
import {GetPagesCount,GetIssuesByPagination} from "../Features/IssueSlice";
import {useNavigate} from 'react-router-dom'; 
import Pagination from './Pagination/Pagination';
import './Home.css';
import EmployeeDropdown from './EmployeeDropdown';
import ImageCarouselModal from './ImageCarouselModal.js';

function IssueStatusBar() {     
    const dispatch = useDispatch();  
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const [sortOrder, setSortOrder] = useState('');
    const [filteredData,setFilteredData]=useState();
    const [dataLoaded, setDataLoaded] = useState(false);
    const [currentPosts, setCurrentPosts] = useState([]);
    const [dataSorted, setDataSorted] = useState(false);
    const [isDataFiltered, setIsDataFiltered] = useState(false);
    const [selectedAssignedEmployee, setSelectedAssignedEmployee] = useState(-1);
    const [IdentifiedEmployee, setIdentifiedEmployee] = useState(-1);
    const [isFromLandingPage, setIsFromLandingPage] = useState(true);
    const projectname = useSelector((state) => state.projects.ProjectName.projectname);
    const {paginationdata, loading, error } = useSelector((state) => state.issues);
    const noOfpages=useSelector((state)=>state.issues.pagesCount)
    

    const [issueFilterVal, setIssueFilterVal] = useState({
      status: 'Any',
      identfiedemp:-1,
      assignTo: -1,
      priority: 'Any',
      seviority: 'Any'
    });

    const ProjectId = useSelector((state) => state.selectedFields.selectedProjectId);
    const selectedFilters = useSelector((state) => state.selectedFields.selectedFilters);
    console.log("selectedFilters",selectedFilters);

    useEffect(() => { 
      dispatch(GetPagesCount({ProjectId,...selectedFilters, postsPerPage}));
      dispatch(getProjectNameProjectId(ProjectId))
    },[])

    useEffect(() => { 
      // console.log(issueFilterVal, selectedAssignedEmployee, IdentifiedEmployee)
      dispatch(GetIssuesByPagination({ProjectId, ...selectedFilters, postsPerPage,currentPage}));
    },[currentPage])

    // console.log("jiohhvu",paginationdata,noOfpages,currentPage);

    useEffect(() => {
      console.log("selected filters in ISB--", selectedFilters);
      // handleFiltersFromLandingPage();
      handleFilterApply();
    }, []);

    
      
    useEffect(() => {
      // console.log("asd", isFromLandingPage);
      if(!isFromLandingPage && paginationdata.length>0){ 
        const filteredData1 = paginationdata.filter(issue => {
              const lowerCaseissueId = issue.issueId.toLowerCase();
              const lowerCaseShortDescription = issue.shortDescription.toLowerCase();
              const lowerCaseStatus = issue.status.toLowerCase();
              const lowerCasePriority = issue.priority.toLowerCase();
              const lowerCaseSearchTerm=searchTerm.toLowerCase();
            
              return (
                lowerCaseShortDescription.includes(lowerCaseSearchTerm) ||
                lowerCaseStatus.includes(lowerCaseSearchTerm) ||
                lowerCasePriority.includes(lowerCaseSearchTerm) ||
                lowerCaseissueId.includes(lowerCaseSearchTerm)
              );
          
        }); 
      setFilteredData(filteredData1)
      setDataLoaded(true);
      setCurrentPosts(filteredData1);
    }
    else{
      setCurrentPage(1);
    }
    // handleFilterApply();
    }, [searchTerm])  

    useEffect(() => {
      if(paginationdata.length > 0){
        setFilteredData(paginationdata)
        setDataLoaded(true);
        setCurrentPosts(paginationdata);
      }
      else if(noOfpages == 0){
        setFilteredData([]);
        setDataLoaded(true);
        setCurrentPosts([]);
      }
      else{
        setCurrentPage(1);
        setFilteredData(paginationdata);
        setDataLoaded(true);
        setCurrentPosts(paginationdata);
      }
    }, [paginationdata])

    // console.log("filteredData",filteredData);
    // console.log("filteredData",filteredData);
    useEffect(() =>{
      if(dataLoaded){
      // const lastPostIndex = currentPage * postsPerPage;
      // const firstPostIndex = lastPostIndex - postsPerPage;
      setCurrentPosts(filteredData);
      setDataSorted(false)
      }
    }, [dataSorted, currentPage])

    useEffect(() =>{
      if(dataLoaded){
      // const lastPostIndex = currentPage * postsPerPage;
      // const firstPostIndex = lastPostIndex - postsPerPage;
      setCurrentPosts(filteredData);
      setIsDataFiltered(false);
      }
    }, [isDataFiltered, currentPage])


    // useEffect(() => {
    //   dispatch(setSelectedFilters((prevFilters) => ({ ...prevFilters, assignTo: `${selectedAssignedEmployee}` })));
    // }, [selectedAssignedEmployee]);
  
    // useEffect(() => {
    //   dispatch(setSelectedFilters((prevFilters) => ({ ...prevFilters, identfiedemp: `${IdentifiedEmployee}` })));
    // }, [IdentifiedEmployee]);
    useEffect(() => {
      const copyselectedFilters = {...selectedFilters, assignTo:selectedAssignedEmployee}
      dispatch(setSelectedFilters(copyselectedFilters));
    }, [selectedAssignedEmployee]);
    
    useEffect(() => {
      const copyselectedFilters = {...selectedFilters, identfiedemp:IdentifiedEmployee}
      dispatch(setSelectedFilters(copyselectedFilters));
    }, [IdentifiedEmployee]);
    

    // const handleFiltersFromLandingPage = () => {
    //   if(selectedFilters!==null){
    //     setIssueFilterVal(selectedFilters)
    //     // setFiltersFromLandingPage(true);
    //   }
    // }
    // console.log("filters using by issuestatusbar",issueFilterVal);

    const handleSort = () => {
        const sortedData = [...filteredData].sort((a, b) => {
        const priorityOrder = { P1: 1, P2: 2, P3: 3 };
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

    const handleSevioritySort = () => {
      const sortedData = [...filteredData].sort((a, b) => {
      const seviorityOrder = { S1: 1, S2: 2, S3: 3 , S4: 4};
        return seviorityOrder[a.seviority] - seviorityOrder[b.seviority];
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
     const handleFilterChange = (event) => {
      const { name, value } = event.target;
      const copyselectedFilters = {...selectedFilters,[name]: value }
      dispatch(setSelectedFilters(copyselectedFilters));
     }
     const handleFilterApply = () => {
      // console.log("selected filters --:- ", selectedFilters);
     
   
        dispatch(GetPagesCount({ProjectId, ...selectedFilters, postsPerPage}));
        if(currentPage > 1){
          dispatch(GetIssuesByPagination({ProjectId, ...selectedFilters, postsPerPage,currentPage:1}));  
        }
        else{
          dispatch(GetIssuesByPagination({ProjectId, ...selectedFilters, postsPerPage,currentPage}));  
        }
      }
     

     const NavigateToSelectedIssue = (issueId) => {
      // console.log(issueId);
      dispatch(setSelectedIssueId(issueId));
      navigate(`/projects/${ProjectId}/display-issue${issueId}`);
     }

     const handleSearch = (event) => {
      setSearchTerm(event.target.value)
      setIsFromLandingPage(false);
     }

     const handleFilterReset = () => {
        // console.log("abxha",paginationdata);
        dispatch(GetPagesCount({ProjectId, status:"Any",identfiedemp: -1, assignTo:-1,priority: "Any",seviority: "Any", postsPerPage}));
        dispatch(GetIssuesByPagination({ProjectId, status:"Any",identfiedemp: -1, assignTo:-1,priority: "Any",seviority: "Any", postsPerPage,currentPage}));
        setFilteredData(paginationdata);
        setIsDataFiltered(true);
        setCurrentPage(1);
        dispatch(setSelectedFilters({status:"Any",identfiedemp: -1, assignTo:-1,priority: "Any",seviority: "Any"}));
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
                <h3> {projectname} Issues</h3>
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
                    <select 
                    className='IssueStatusBar-background-color'
                      name='status'
                      value={selectedFilters.status}
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
                    className='IssueStatusBar-background-color'
                      name='priority'
                      value={selectedFilters.priority|| 'Any'}
                      onChange={handleFilterChange}
                    >
                      <option value="Any">Any</option>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="P3">P3</option>
                    </select>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Severity</label>
                    <select 
                      className='IssueStatusBar-background-color'
                      name='seviority'
                      value={selectedFilters.seviority|| 'Any'}
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
                    <EmployeeDropdown isIdentifiedEmp={true} isFromFilters={true} callBackFunc={setIdentifiedEmployee} />
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className='each-filter' style={{display:'flex', flexDirection:'column',marginRight:"20px"}}>
                    <label>Assigned Employee</label>
                    <EmployeeDropdown isFromFilters={true} callBackFunc={setSelectedAssignedEmployee} employeeFromFiltersLandingPage={selectedFilters.assignTo} />
                </div>                
              </div>
              <br />
              <div>
              <button className='button-background-color' onClick={handleFilterApply}>Apply Filters</button>
              &nbsp;&nbsp;&nbsp;
              <button className='button-background-color' onClick={handleFilterReset}>Reset</button>
              </div>
          
          </div>

          <div className='Issue-table'>
          <table>
            <thead>
              <tr>
                <th className='p-3 text-center IssueStatusBar-background-color' style={{width:'19%'}}>Issue Id</th>
                <th className='p-3 text-center IssueStatusBar-background-color' style={{width:'14%'}} >Status &nbsp; <FaSort className="clickable-element" onClick={handleStatusSort}/></th>
                <th className='p-3 text-center IssueStatusBar-background-color' style={{width:'14%'}} >Priority &nbsp;<FaSort className="clickable-element" onClick={handleSort}/></th>
                <th className='p-3 text-center IssueStatusBar-background-color' style={{width:'14%'}} >Severity &nbsp;<FaSort className="clickable-element" onClick={handleSevioritySort}/></th>
                <th className='p-3 text-center IssueStatusBar-background-color' style={{width:'14%'}} >Category</th>
                <th className='p-3 text-center IssueStatusBar-background-color' style={{width:'35%'}}>Summary</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map(issue => ( 
                <tr key={issue.issueId}>
                  <td className='p-3 table-1stcol' style={{position:"relative"}}>
                    
                  <div className='row-'>
                        <a onClick={() => NavigateToSelectedIssue(issue.issueId)} className='clickable-element'>
                            {issue.issueId}
                        </a> &nbsp;&nbsp;&nbsp;
                        <div className='pointer-icon1'>
                            <ImageCarouselModal images={issue.images} />
                        </div>
                        <FaPencilAlt className='pointer-icon2' onClick={() => handleEditIcon(issue.issueId)}/>
                    </div>
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
                    {issue.seviority}
                  {/* <center>
                  <FaEye className='pointer-icon' onClick={() => handleViewIcon(issue.issueId)} /></center> */}
                  </td>
                  <td >
                    {issue.category}
                  </td>
                  <td>
                    {issue.shortDescription}
                  </td>
                  
                </tr>
              ))}
              
              </tbody>
            </table>
            <Pagination
                  noOfpages={noOfpages}
                  setCurrentPage={setCurrentPage} 
                  currentPage={currentPage}
                />
          </div> 
        </div>
      );
  }
}

export default  IssueStatusBar; 