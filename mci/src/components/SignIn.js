import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import { Link } from 'react-router-dom';  

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      // Assuming your AuthService.login method expects an object with email and password
      await AuthService.login(email, password);
      // Redirect to dashboard or home page on successful login
      // Replace the below URL with where you need to redirect after login
      window.location.href = '/dashboard';
    } catch (error) {
      // If there's an error, such as wrong credentials, display it
      setErrorMessage('Failed to sign in. Please check your credentials.');
    }
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
            <Link to="/" className="header-button">Home</Link>
            <Link to="/signup" className="header-button">Sign Up</Link>
            <Link to="/search" className="header-button">Search</Link>
          </div>
        </div>
    </header>

    <div className="signin-container">
      <form className="signin-form" onSubmit={handleSignIn}>
        <h2>Sign In to MCIRetroVault</h2>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={togglePasswordVisibility} className="show-password">
            {showPassword ? 'Hide' : 'Show'} password
          </button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="forgot-password">
          <a href="#">Forgot your password?</a>
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
    </>
  );
}

export default SignIn;
