import React from 'react';
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';  
function HomePage() {
  return (
    <div>
      <h1>Welcome to MCIRetroVault Website</h1>
      <img src={MCIRetroVaultImage} alt="MCIRetro Vault" style={{ width: '400px', height: 'auto' }} />
      <p>content</p>
      {/* More content*/}
    </div>
  );
}

export default HomePage;
