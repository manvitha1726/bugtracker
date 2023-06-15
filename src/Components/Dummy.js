import {React, useState } from 'react'

import IssueStatusBar from './IssueStatusBar'
import DisplayIssue from './DisplayIssue'
import IssueForm from './IssueForm';

function Dummy({ProjectId}) { 
  const [issueId, setIssueId] = useState(0);
  const [displayIssueVisible, setDisplayIssueVisible] = useState(false);
  const [issueFormVisible, setIssueFormVisible] = useState(true);
  const handleTagClick = (value1) => {
    setIssueId(value1);
    setDisplayIssueVisible(true);
    setIssueFormVisible(false);   
  };
  const handleIssueFormLoad = () => {
    setDisplayIssueVisible(false);
    setIssueFormVisible(true);
  };
  return (
   <div style={{display:'flex',flexDirection:'row'}}>
       {issueFormVisible?(<IssueForm ProjectId={ProjectId}/>)
                        :displayIssueVisible?(<DisplayIssue issueId={issueId}/>):null
        }
        <IssueStatusBar handleTagClick={handleTagClick} handleIssueFormLoad={handleIssueFormLoad} ProjectId={ProjectId}/> 
        
   </div>
  ) 
}

export default Dummy;