import React from 'react';
import { Link } from 'react-router-dom';  
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';

function HomePage() {
  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src={MCIRetroVaultImage} alt="MCIRetro Vault" style={{ width: '100px', height: 'auto' }} />
            <h1>Welcome to MCIRetroVault Website</h1>
          </div>
          <div className="header-right">
            <Link to="/signin" className="header-button">Sign In</Link>
            <Link to="/signup" className="header-button">Sign Up</Link>
          </div>
        </div>
      </header>

      <main>
        <h1>MCIRetroVault Content </h1>
      </main>

      <footer>
        <p>&copy; 2023 MCIRetroVault</p>
      </footer>
    </>
  );
}

export default HomePage;