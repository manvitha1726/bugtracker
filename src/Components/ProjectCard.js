// import React from 'react';
// import 'tachyons'; // Import Tachyons CSS
// import {useNavigate} from 'react-router-dom';
// import './Home.css';

// function ProjectCard({project,onCardClick}) {
//   const navigate =useNavigate();
//     const handleClick = () => {
//         onCardClick(project.projectid);
//         navigate(`/projects/${project.projectid}`);
//     };
//   return(
//     <div className="tc dib br3 pa3 ml3 mt5  grow cardu" onClick={handleClick}>
//         <p>{project.projectname}</p> 
//     </div>
//   );
// }

// export default ProjectCard;
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
    navigate(`/projects/${project.projectid}`);
  };

  return (
    <div className="tc dib br3 pa3 ml3 mt5 grow cardu" onClick={handleClick}>
      <p>{project.projectname}</p>
    </div>
  );
}

export default ProjectCard;
