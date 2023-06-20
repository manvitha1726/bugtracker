import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateIssueStatus,GetIssueByProjectId } from '../Features/IssueSlice';
import { setSelectedIssueId } from '../Features/SelectedFieldsSlice';
import { FaPlus ,FaEye,FaPencilAlt,FaArrowLeft} from 'react-icons/fa';
import { getAllProjects } from "../Features/ProjectsSlice";
import {useNavigate} from 'react-router-dom';
import Pagination from './Pagination/Pagination';
import './Home.css';

function IssueStatusBar() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.issues);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(4);
    const ProjectId = useSelector((state) => state.selectedFields.selectedProjectId);
    const filteredData = data.filter(issue => issue.issueName.toLowerCase() 
    .includes(searchTerm.toLowerCase())); 
    const NavigateBackClick = () => {
      navigate(`/projects/`);
    };
    const handlePlusIconClick = () => {
      navigate(`/projects/${ProjectId}/AddIssue`);
    };
    const handleViewIcon = (issueId) => {
      dispatch(setSelectedIssueId(issueId));
      navigate(`/projects/${ProjectId}/ViewIssue${issueId}`);
    };
    const handleEditIcon = (issueId) => {
      dispatch(setSelectedIssueId(issueId));
      navigate(`/projects/${ProjectId}/EditIssue${issueId}`);
    };
    
    useEffect(() => { 
      dispatch(GetIssueByProjectId(ProjectId)) 
    },[ProjectId])

    const projObj= useSelector((state) => state.projects);
    useEffect(() => {
      dispatch(getAllProjects());
      console.log("projects data",projObj.data);
    }, []);

    console.log(data);
    const handleStatusChange = (issueId, status) => {
        dispatch(updateIssueStatus({ issueId, status }))
          .then((response) => {
            console.log("Result",response);
            console.log('Issue status updated successfully');
            if(response.payload){ 
              dispatch(GetIssueByProjectId(ProjectId));
            }
          })
          .catch(error => {
            console.error('Error updating bug status:', error);
          });
     };
  
  if(loading){
    return <h1>Loading...</h1>
   }

  if(error){
    return <h2>Oops Something wrong..</h2>
   }
   const lastPostIndex = currentPage * postsPerPage;
   const firstPostIndex = lastPostIndex - postsPerPage;
   const currentPosts =  filteredData.slice(firstPostIndex, lastPostIndex);

   return (
    <div>
      <h1 className='text-center heading'>{projObj.data[ProjectId-1].projectname} Issues</h1>
      <div className='align'>
         <input
         className="pa2 bb br3  ma2 shadow"
        type="text"
        placeholder="Search Issue"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      /></div>
      <div className='alignright text-center'>
      <div style={{display:"flex",flexDirection:"row"}}>
      <FaArrowLeft onClick={NavigateBackClick}/> &nbsp;&nbsp;&nbsp;
      <div>
       <FaPlus
        className="icon rounded p-1 " style={{backgroundColor:"rgb(139, 200, 209)"}}
        onClick={handlePlusIconClick} 
      /> <p>Add Issue</p>
      </div>
      </div>
      </div>
      <div className='m-5'>
      <table class="table table-bordered rounded-lg">
        <thead>
          <tr>
            <th className='p-3 text-center' style={{backgroundColor:"rgb(139, 200, 209)"}}>Issue</th>
            <th className='p-3 text-center'  style={{backgroundColor:"rgb(139, 200, 209)"}}>Status</th>
            <th className='p-3 text-center' style={{backgroundColor:"rgb(139, 200, 209)"}}>Priority</th>
            <th className='p-3 text-center'  style={{backgroundColor:"rgb(139, 200, 209)"}}>View</th>
            <th className='p-3 text-center' style={{backgroundColor:"rgb(139, 200, 209)"}}>Edit</th>
           
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(issue => ( 
            <tr key={issue.issueId}>
              <center><td className='p-3'>{issue.issueName}</td></center>
              <td className='p-3'> 
              <center>
                <select 
                  value={issue.status|| 'Open'}
                  onChange={e => handleStatusChange(issue.issueId, e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="Close">Closed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Hold">Hold</option>
                </select>
                </center> 
              </td>
              <td className='p-3'>
                <center>
              {issue.priority}
              </center>
              </td>
              
              <td >
              <center>
              <FaEye className='pointer-icon' onClick={() => handleViewIcon(issue.issueId)} /></center>
              </td>
              <td>
              <center>
                <FaPencilAlt className='pointer-icon' onClick={() => handleEditIcon(issue.issueId)}/></center>
              </td>
              
            </tr>
          ))}
          <Pagination
              totalPosts={filteredData.length}
              postsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default  IssueStatusBar; 