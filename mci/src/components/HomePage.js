import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  let navigate = useNavigate(); 

  const navigateToLogin = () => {
    navigate('/login'); 
  };

  return (
    <div>
      <h1>Welcome to the MCIRetroVault</h1>
      <button onClick={navigateToLogin}>Login</button>
    </div>
  );
};

export default HomePage;
