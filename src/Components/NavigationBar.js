import React, { useState } from "react";
import { FaBook, FaRoad, FaCog } from "react-icons/fa";
import "./NavigationBar.css";
import './Home.css';

function NavigationBar({ onItemClick,selectedItem}) {

  return (
    <div className="left-nav-bar">
      <div
        className={`nav-item clickable-element ${selectedItem === 'MyView' ? 'selected' : ''}`}
        onClick={() => onItemClick('MyView')}
      >
        <FaCog className="nav-icon" />
        <span className="nav-text">My View</span>
      </div>

      <div
        className={`nav-item clickable-element ${selectedItem === 'ViewIssues' ? 'selected' : ''}`}
        onClick={() => onItemClick('ViewIssues')}
      >
        <FaBook className="nav-icon" />
        <span className="nav-text">View Issues</span>
      </div>

      <div
        className={`nav-item clickable-element ${selectedItem === 'RoadMap' ? 'selected' : ''}`}
        onClick={() => onItemClick('RoadMap')}
      >
        <FaRoad className="nav-icon" />
        <span className="nav-text">Road Map</span>
      </div>
    </div>
  );
}

export default NavigationBar;