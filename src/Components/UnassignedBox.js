// ExpandableBox.js

import React, { useState } from 'react';
import './UnassignedBox.css';

const ExpandableBox = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputs, setInputs] = useState([]);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchData = () => {
    // Simulating API call and setting inputs
    const data = {
      inputs: ['Input 1', 'Input 2', 'Input 3'] // Replace with your API response
    };
    setInputs(data.inputs);
  };

  return (
    <div className='m-5'>
    <table className="table table-bordered rounded-lg">
      <thead>
        <tr>
          <th className='p-3 text-center' style={{backgroundColor:"rgb(139, 200, 209)"}}>Issue</th>
        </tr>
      </thead>
      <tbody>
        {currentPosts.map(issue => ( 
          <tr key={issue.issueId}>
            <td className='p-3'>
              <a onClick={() => NavigateToSelectedIssue(issue.issueId)}>
                  {issue.issueName}
              </a> &nbsp;&nbsp;&nbsp;
              <FaPencilAlt className='pointer-icon' onClick={() => handleEditIcon(issue.issueId)}/>
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
    </div>
  );
};

export default UnassignedBox;
