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
    <div className='header-container header-background-color clickable-element' style={{height:"85px"}} onClick={handleClick}>
      <img src={icon} style={{width:"85px",height:"85px",marginLeft:"35px"}}/>
      <h1 className='heading'>Issue Tracking Tool</h1>
      <button className='button-background-color' style={{height:'40px', width:'150px', position:'absolute', right:'50px', top:'30px'}}  onClick={goToNavigate} >Go to projects</button>

    </div>
     </div>
  );
};

export default Header;