import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import AuthService from '../services/AuthService'; // importing AuthService

function HomePage() {
  const navigate = useNavigate();
  const safeParse = (data) => {
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  };
  const user = safeParse(localStorage.getItem('user'));
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/users')
      .then((response) => response.json())
      .then((data) => {
        console.log('Data from /users:', data); // Make sure this logs the expected object
        setTotalUsers(data.num_users); // Update the state with the number of users
      })
      .catch((error) => {
        console.error('Error fetching total users:', error);
      });
  }, []);
  
  

  const handleLogout = () => {
    AuthService.logout(); // Clear the user session
    navigate('/'); // Redirect to home page or login page
  };

  return (
    <>
      <header>
        <div className="header-container">
          <div className="header-left">
            <img src={MCIRetroVaultImage} alt="MCIRetro Vault" style={{ width: '100px', height: 'auto' }} />
            <h1>MCIRetroVault</h1>
          </div>
          <div className="header-right">
            {user ? (
              <>
                {/* User is logged in */}
                <Link to="/search" className="header-button">Search</Link>
                <Link to="/dashboard" className="header-button">Dashboard</Link>
                <button onClick={handleLogout} className="header-button">Logout</button>

                {/* Add more links as needed */}
              </>
            ) : (
              <>
                {/* User is not logged in */}
                <Link to="/signin" className="header-button">Sign In</Link>
                <Link to="/signup" className="header-button">Sign Up</Link>
                <Link to="/search" className="header-button">Search</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main>
        <h1>MCIRetroVault Content</h1>
        <p>Total Registered Users: {totalUsers}</p> {/* Display the total number of registered users */}
      </main>

      <footer>
        <p>&copy; 2023 MCIRetroVault</p>
      </footer>
    </>
  );
}

export default HomePage;
