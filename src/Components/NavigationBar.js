import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook,faRoad } from "@fortawesome/free-solid-svg-icons";
import "./NavigationBar.css";

function NavigationBar() {
    return (
      <div className="left-nav-bar">
      <div className="nav-item">
        <FontAwesomeIcon icon={faBook} className="nav-icon" />
        <span className="nav-text">View Issues</span>
      </div>
      <div className="nav-item">
        <FontAwesomeIcon icon={faRoad} className="nav-icon" />
        <span className="nav-text">Road Map</span>
      </div>
    </div>
    );
}

export default  NavigationBar; 
