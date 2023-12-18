import React from 'react';
import { Link, useNavigate} from 'react-router-dom';  
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import AuthService from '../services/AuthService'; // importing AuthService

function Dashboard() {
  const navigate = useNavigate();
  const safeParse = (data) => {
      try {
          return JSON.parse(data);
      } catch (e) {
          return null;
      }
  };
  const user = safeParse(localStorage.getItem('user'));

  const handleLogout = () => {
    AuthService.logout(); // Clear the user session
    navigate('/'); // Redirect to home page
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src={MCIRetroVaultImage} alt="MCIRetro Vault" style={{ width: '100px', height: 'auto' }} />
            <h1>MCIRetroVault - Dashboard</h1>
          </div>
          <div className="header-right">
              <>
                <Link to="/" className="header-button">Home</Link>
                <Link to="/platforms" className="header-button">Platforms</Link>
                <Link to="/search" className="header-button">Search</Link>
                <button onClick={handleLogout} className="header-button">Logout</button>
                
                {/* Add more links as needed */}
              </>
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

export default Dashboard;
