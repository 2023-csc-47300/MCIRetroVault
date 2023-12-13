import React, { useState } from 'react';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <form className="signin-form">
        <h2>Sign In to MCIRetroVault</h2>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type={showPassword ? 'text' : 'password'} id="password" required />
          <button type="button" onClick={togglePasswordVisibility} className="show-password">
            Show password
          </button>
        </div>
        <div className="forgot-password">
          <a href="#">Forgot your password?</a>
        </div>
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;