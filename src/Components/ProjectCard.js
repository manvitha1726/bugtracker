import React from 'react';
import 'tachyons'; // Import Tachyons CSS
import {useNavigate} from 'react-router-dom';

function ProjectCard({project,onCardClick}) {
  const navigate =useNavigate();
    const handleClick = () => {
        onCardClick(project.projectid);
        navigate(`/projects/${project.projectid}`);
    };
  return(
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5" onClick={handleClick}>
      <div>
        <p>{project.projectname}</p>
      </div>
    </div>
  );
}

export default ProjectCard;