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
    <div data-testid="header-element">
    <div className='header-container header-background-color' onClick={handleClick}>
      <img src={icon} style={{width:"80px",height:"80px",marginLeft:"35px"}}/>
      <h1 className='heading'>Issue Tracking Tool</h1>
    </div>
     </div>
  );
};

export default Header;