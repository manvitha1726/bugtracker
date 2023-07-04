import React from 'react';
import 'tachyons';
import { useDispatch } from 'react-redux';
import { setSelectedProjectId } from '../Features/SelectedFieldsSlice';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function ProjectCard({ project }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setSelectedProjectId(project.projectid));
    navigate(`/projects/${project.projectid}`)
  };

  return (
    <div className={`tc dib br3 pa3 ml3 mt5 mb5 grow pointer ${project.highPriorityIssues > 0 && project.s1seviourty ? "card-red" : "cardu"}`} onClick={handleClick}>
        <h5>{project.projectname}</h5>
        <p>Issues: {project.totalIssues}</p> 
        <div className="priority-container">
          <div className="priority-ball high-priority" title="High Priority">
            <span className="priority-text">High</span>
            {project.highPriorityIssues}
          </div>
          <div className="priority-ball medium-priority" title="Medium Priority">
            <span className="priority-text">Medium</span>
            {project.mediumPriorityIssues}
          </div>
          <div className="priority-ball low-priority" title="Low Priority">
            <span className="priority-text">Low</span>
            {project.lowPriorityIssues}
          </div>
        </div>
      </div>
    );
  
}

export default ProjectCard;
