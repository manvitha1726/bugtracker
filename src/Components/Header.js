import React from 'react';
import { useNavigate } from 'react-router-dom';
import icon from './Icon.png'

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };

  return (
    <div>
    <div className='header-container' onClick={handleClick}>
      <img src={icon} style={{width:"80px",height:"80px",marginLeft:"35px"}}/>
      <h1 className='heading'>Issue Tracking Tool</h1>
     
    </div>
     </div>
  );
};

export default Header;