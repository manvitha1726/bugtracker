import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedIssueId } from '../Features/SelectedFieldsSlice';

const IssueTable = ({issuesList, tableName, noOfIssues}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {selectedProjectId} = useSelector((state) => state.selectedFields);
    const handleButtonClick = () => {
        if(tableName === 'Unassigned'){
            navigate(`/projects/${selectedProjectId}/view-all-issues`)
        }
        else{
            navigate(`/projects/${selectedProjectId}/view-all-issues`)
        }
    }
    const handleNavigateToIssue = (issueId) => {
        dispatch(setSelectedIssueId(issueId));
        navigate(`/projects/${selectedProjectId}/display-issue${issueId}`);
    }
  return (
    <div>
        <div className='table-head'>
            <a onClick={handleButtonClick}>
                {tableName}
            </a>
            &nbsp;&nbsp;&nbsp;
            {
                issuesList.length > 0 ? <span>1 - {issuesList.length} / {noOfIssues}</span>
                : <span></span>
            }
            &nbsp;&nbsp;&nbsp;
            <button onClick={handleButtonClick}>
                View Issues
            </button>
        </div>
        <table className="table table-bordered rounded-lg" min>
            <tbody>
                {console.log("issueList inside issue table : ", issuesList)}
            {issuesList.length > 0 ?
                
                issuesList.map(issue => (
                    <tr key={issue.issueId}>
                        <td>
                            <a onClick={() => handleNavigateToIssue(issue.issueId)}>
                                {issue.issueName}
                            </a>
                        </td>
                        <td>
                            {issue.status}
                        </td>
                        <td>
                            {issue.priority}
                        </td>
                        <td>
                            {issue.dateidentified.substring(0, 10)}
                        </td>
                    </tr>
                ))
                : 
                <div>
                    <p>
                        No {tableName} issues
                    </p>
                </div>
            }
            </tbody>
        </table>
        
    </div>
  )
}

export default IssueTable