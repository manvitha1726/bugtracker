import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import IssueLandingPage from './IssueLandingPage';
import IssueStatusBar from './IssueStatusBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Mainpage = () => {
  const [selectedItem, setSelectedItem] = useState("MyView");
  const projectId = useSelector((state) => state.selectedFields.selectedProjectId);
  const navigate=useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item);
    navigate(`/projects/${projectId}/${item}`);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '10%' }}>
        <NavigationBar onItemClick={handleItemClick} selectedItem={selectedItem}/>
      </div>
      <div style={{ width: '90%' }}>
        {selectedItem === 'MyView' && <IssueLandingPage onItemClick={handleItemClick}/>}
        {selectedItem === 'ViewIssues' && <IssueStatusBar />}
        {selectedItem === 'RoadMap' && <div>Road Map Content</div>}
      </div>
    </div>
  );
};

export default Mainpage;
