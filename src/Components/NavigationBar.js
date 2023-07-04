// import React, { useState } from "react";
// import { FaBook, FaRoad, FaCog } from "react-icons/fa";
// import "./NavigationBar.css";
// import './Home.css';
// // import {useLocation } from 'react-router-dom';


// function NavigationBar({ onItemClick }) {
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleItemClick = (item) => {
//     onItemClick(item);
//     setSelectedItem(item);
//   };

//   return (
//     <div className="left-nav-bar">
//       <div className="nav-item" onClick={() => handleItemClick('MyView')}>
//         <FaCog className="nav-icon" />
//         <span className="nav-text">My View</span>
//       </div>

//       <div className="nav-item" onClick={() => handleItemClick('ViewIssues')}>
//         <FaBook className="nav-icon" />
//         <span className="nav-text">View Issues</span>
//       </div>

//       <div className="nav-item" onClick={() => handleItemClick('RoadMap')}>
//         <FaRoad className="nav-icon" />
//         <span className="nav-text">Road Map</span>
//       </div>
//     </div>
//   );
// }

// export default NavigationBar;

// import React from "react";
// import { FaBook, FaRoad, FaCog } from "react-icons/fa";
// import "./NavigationBar.css";

// function NavigationBar({ onItemClick }) {
//   const handleItemClick = (item) => {
//     onItemClick(item);
//   };

//   return (
//     <div className="left-nav-bar">
//       <div className="nav-item" onClick={() => handleItemClick('MyView')}>
//         <FaCog className="nav-icon" />
//         <span className="nav-text">My View</span>
//       </div> 

//       <div className="nav-item" onClick={() => handleItemClick('ViewIssues')}>
//         <FaBook className="nav-icon" />
//         <span className="nav-text">View Issues</span>
//       </div>

//       <div className="nav-item" onClick={() => handleItemClick('RoadMap')}>
//         <FaRoad className="nav-icon" />
//         <span className="nav-text">Road Map</span>
//       </div>
//     </div>
//   );
// }

// export default NavigationBar;
import React, { useState } from "react";
import { FaBook, FaRoad, FaCog } from "react-icons/fa";
import "./NavigationBar.css";
import './Home.css';

function NavigationBar({ onItemClick }) {
  const [selectedItem, setSelectedItem] = useState("MyView");

  const handleItemClick = (item) => {
    onItemClick(item);
    setSelectedItem(item);
  };

  return (
    <div className="left-nav-bar">
      <div
        className={`nav-item ${selectedItem === 'MyView' ? 'selected' : ''}`}
        onClick={() => handleItemClick('MyView')}
      >
        <FaCog className="nav-icon" />
        <span className="nav-text">My View</span>
      </div>

      <div
        className={`nav-item ${selectedItem === 'ViewIssues' ? 'selected' : ''}`}
        onClick={() => handleItemClick('ViewIssues')}
      >
        <FaBook className="nav-icon" />
        <span className="nav-text">View Issues</span>
      </div>

      <div
        className={`nav-item ${selectedItem === 'RoadMap' ? 'selected' : ''}`}
        onClick={() => handleItemClick('RoadMap')}
      >
        <FaRoad className="nav-icon" />
        <span className="nav-text">Road Map</span>
      </div>
    </div>
  );
}

export default NavigationBar;