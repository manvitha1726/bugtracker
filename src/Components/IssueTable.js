import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaCalendarAlt } from 'react-icons/fa'; // Import the calendar icon
import './IssueTable.css';
import { setSelectedFilters, setSelectedIssueId } from '../Features/SelectedFieldsSlice';

const IssueTable = ({issuesList, tableName, noOfIssues,onItemClick}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {selectedProjectId} = useSelector((state) => state.selectedFields);
    const selectedFilters = useSelector((state) => state.selectedFields.selectedFilters);
   
    const handleButtonClick = (item) => {
        if(tableName === 'Unassigned'){
            dispatch(setSelectedFilters({
                assignTo: 0,
                status: 'Any',
                identfiedemp:-1,
                priority: 'Any',
                severity: 'Any'
            }))
            // console.log("selectedFilters in ISB : ", selectedFilters);
            // navigate(`/projects/${selectedProjectId}/IssueStatus`) //disturbed functionality
            onItemClick(item);
        }
        else{
            dispatch(setSelectedFilters({
                status: "Close",
                assignTo: -1,
                identfiedemp:-1,
                priority: 'Any',
                severity: 'Any'
            }))
            console.log("selectedFilters in Issue table : ", selectedFilters);
            // navigate(`/projects/${selectedProjectId}/IssueStatus`)
            onItemClick(item);
        }
    }
    const handleNavigateToIssue = (issueId) => {
        dispatch(setSelectedIssueId(issueId));
        navigate(`/projects/${selectedProjectId}/display-issue${issueId}`);
    }
  return (
    <div className='Main-Container'>
      <div className='table-head'>
     <div className="table-info-wrapper">
        <a onClick={()=>handleButtonClick('ViewIssues')}>{tableName}</a>
        {
          issuesList.length > 0 ? (
            <span className='table-info'>
              1 - {issuesList.length} / {noOfIssues}
            </span>
          ) : (
            <span className='table-info'> 0 - {issuesList.length} / {noOfIssues}</span>
          )
        }
       
          <button className='View-Button' onClick={()=>handleButtonClick('ViewIssues')} >View Issues</button>
      </div>
      </div>
      <table className='table-'>
        <tbody>
          {issuesList.length > 0 ? (
            issuesList.map((issue) => (
              <tr key={issue.issueId}>
                <td>
                  <a onClick={() => handleNavigateToIssue(issue.issueId)}>
                    {issue.issueName}
                  </a>
                </td>
                <td>{issue.status}</td>
                <td>{issue.priority}</td>
                <td>{new Date(issue.dateidentified).toLocaleString(undefined, {dateStyle: "medium",timeStyle: "short"})}</td>
              </tr>
            ))
          ) : (
            <div className='No-Issues'>
              <p>No {tableName} issues</p>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;