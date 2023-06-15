import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {updateIssueStatus,GetIssueByProjectId } from '../Features/IssueSlice';
import { FaPlus ,FaEye,FaPencilAlt} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

function IssueStatusBar({ProjectId,handleViewIconClick}) {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.issues);
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredData = data.filter(issue => issue.issueName.includes(searchTerm));
    const handlePlusIconClick = () => {
      navigate(`/projects/${ProjectId}/AddIssue`);
    };
    const handleViewIcon = (issueId) => {
      handleViewIconClick(issueId);
      navigate(`/projects/${ProjectId}/ViewIssue${issueId}`);
      // navigate(`/projects/${ProjectId}/ViewIssue`);
    };
    
    useEffect(() => { 
      dispatch(GetIssueByProjectId(ProjectId)) 
    },[ProjectId])

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

   return (
    <div>
         <input
        type="text"
        placeholder="Search Issue"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
       <FaPlus
        className="icon"
        onClick={handlePlusIconClick} 
      />
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(issue => ( 
            <tr key={issue.issueId}>
              <td>{issue.issueName}</td>
              <td>  
                <select 
                  value={issue.status|| 'Open'}
                  onChange={e => handleStatusChange(issue.issueId, e.target.value)}
                >
                  <option value="Open">Open</option>
                  <option value="Close">Closed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Hold">Hold</option>
                </select>
              </td>
              <td>
              {issue.priority}
              </td>
              <td>
              <FaEye onClick={() => handleViewIcon(issue.issueId)} />
              </td>
              <td>
                <FaPencilAlt/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default  IssueStatusBar; 