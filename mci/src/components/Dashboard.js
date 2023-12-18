import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import AuthService from '../services/AuthService';

function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  const getUserToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.access_token;
  };

  const handleLogout = () => {
    AuthService.logout();
    navigate('/');
  };

  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = getUserToken();

      if (token) {
        try {
          const response = await fetch('http://127.0.0.1:5000/user_email', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserEmail(data.email);
          } else {
            console.error('Failed to fetch user email');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchUserEmail();
  }, []);

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
      <main style={{ padding: '20px' }}>
          <h1>Account Content</h1>
      </main>
      <body>
        <center>
          <p style={{ marginTop: '20px' }}>User Email: {userEmail}</p>
        </center>
      </body>

      <footer>
        <p>&copy; 2023 MCIRetroVault</p>
      </footer>
    </>
  );
}

export default Dashboard;
