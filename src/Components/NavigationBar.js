import React from "react";
import { FaBook, FaRoad, FaCog } from "react-icons/fa";
import "./NavigationBar.css";

function NavigationBar({ onItemClick }) {
  const handleItemClick = (item) => {
    onItemClick(item);
  };

  return (
    <div className="left-nav-bar">
      <div className="nav-item" onClick={() => handleItemClick('MyView')}>
        <FaCog className="nav-icon" />
        <span className="nav-text">My View</span>
      </div> 

      <div className="nav-item" onClick={() => handleItemClick('ViewIssues')}>
        <FaBook className="nav-icon" />
        <span className="nav-text">View Issues</span>
      </div>

      <div className="nav-item" onClick={() => handleItemClick('RoadMap')}>
        <FaRoad className="nav-icon" />
        <span className="nav-text">Road Map</span>
      </div>
    </div>
  );
}

export default NavigationBar;
