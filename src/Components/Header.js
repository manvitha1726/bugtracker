import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from './Icon.png'

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  const goToNavigate = () => {
    navigate(`/projects`);
  }

  return (
    <div>
    <div className='header-container' >
      <img  onClick={handleClick} src={icon} style={{width:"80px",height:"80px",marginLeft:"35px"}}/>
      <h1  onClick={handleClick} className='heading'>Issue Tracker</h1>
      
      <button onClick={goToNavigate} style={{marginRight:"50px", marginTop:"30px"}}>
          GoTo Projects
      </button>
    </div>
     </div>
  );
};

export default Header;