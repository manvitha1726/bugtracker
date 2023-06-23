import React, { useState } from 'react';
import NavigationBar from './NavigationBar';
import IssueLandingPage from './IssueLandingPage';
import IssueStatusBar from './IssueStatusBar';

const Mainpage = () => {
  const [selectedItem, setSelectedItem] = useState("MyView");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ width: '10%' }}>
        <NavigationBar onItemClick={handleItemClick} />
      </div>
      <div style={{ width: '90%' }}>
        {selectedItem === 'MyView' && <IssueLandingPage />}
        {selectedItem === 'ViewIssues' && <IssueStatusBar />}
        {selectedItem === 'RoadMap' && <div>Road Map Content</div>}
      </div>
    </div>
  );
};

export default Mainpage;
