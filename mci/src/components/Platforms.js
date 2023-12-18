import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import AuthService from '../services/AuthService';
import $ from 'jquery';

function Platforms() {
    const navigate = useNavigate();
    const [platformName, setPlatformName] = useState('');
    const [platformID, setPlatformID] = useState(null);
    const [platformData, setPlatformData] = useState(null);

    const safeParse = (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
    };

    const user = safeParse(localStorage.getItem('user'));

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };
    
    const handlePlatformChange = (e) => {

        setPlatformName(e.target.value);

        // Giant Bomb ID's for game consoles: update list if adding more consoles!
        const Arcade = 84;
        const a2600 = 40;
        const a5200 = 67;
        const a7800 = 70;
        const NES = 21;
        const SNES = 9;
        const N64 = 43;
        const GB = 3;
        const GBC = 57;
        const VB = 79;
        const GBA = 4;
        const MasterSystem = 8;
        const Genesis = 6;
        const GameGear = 5;
        const PS1 = 22;

        var ID;
        switch(e.target.value){
            case "Arcade": ID = Arcade; break;
            case "2600": ID = a2600; break;
            case "5200": ID = a5200; break;
            case "7800": ID = a7800; break;
            case "NES": ID = NES; break;
            case "SNES": ID = SNES; break;
            case "N64": ID = N64; break;
            case "GB": ID = GB; break;
            case "GBC": ID = GBC; break;
            case "VB": ID = VB; break;
            case "GBA": ID = GBA; break;
            case "MasterSystem": ID = MasterSystem; break;
            case "Genesis": ID = Genesis; break;
            case "GameGear": ID = GameGear; break;
            case "PS1": ID = PS1; break;
            default: ID = 0; break;
        }
        setPlatformID(ID);
    };

    useEffect(() => {
        if (platformID) {
            async function fetchData() {
                try {
                    const response = await $.ajax({
                        url: `http://127.0.0.1:5000/display_platform`, // Point to Flask route
                        dataType: "json",
                        data: { platformID: platformID }
                    });
                    setPlatformData(response);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                    setPlatformData(null);
                }
            }
            fetchData();
        } else {
            setPlatformData(null); // Reset platform data when no platform is selected
        }
    }, [platformID]);


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
                        {user ? (
                            <>
                                <button onClick={handleLogout} className="header-button">Logout</button>
                                {/* Add more user-specific links or information here */}
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="header-button">Sign In</Link>
                                <Link to="/signup" className="header-button">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
        <main>
            <center>
            
            <div class="block">
            <label for="platforms"> Choose a platform you'd like to read about: </label> <br/>
            </div>
            <div class="block">
            <select name="platforms" id="platforms" value={platformName} onChange={handlePlatformChange}>
            <option value="choose">Choose a platform...</option>
            <option value="Arcade">Arcade</option>
            <option value="2600">Atari 2600</option>
            <option value="5200">Atari 5200</option>
            <option value="7800">Atari 7800</option>
            <option value="NES">NES</option>
            <option value="SNES">SNES</option>
            <option value="N64">N64</option>
            <option value="GB">Game Boy</option>
            <option value="GBC">Game Boy Color</option>
            <option value="VB">Virtual Boy</option>
            <option value="GBA">Game Boy Advance</option>
            <option value="MasterSystem">Master System</option>
            <option value="Genesis">Genesis</option>
            <option value="GameGear">Game Gear</option>
            <option value="PS1">PlayStation</option>
            </select><br/>
                    </div>
                </center>
                {platformID && platformData === undefined && <div>Loading...</div>}
                {platformData && (
                <center>
                    <div className="header">
                        <strong> {platformData.name?.toUpperCase() || "Unknown Platform"} </strong>
                    </div>
                    <div className='header'>
                        <img src={platformData.image?.small_url} alt={platformData.name || "Platform Image"} />
                    </div>
                    <div className='block'>
                        <div className='desc'>
                            <center>
                                <strong>
                                    © {typeof platformData.company === 'string' ? platformData.company.toUpperCase() : "Unknown Company"} <br/>
                                    {platformData.release_date || "Unknown Release Date"} <br/>
                                    MSRP ${platformData.original_price || "Unknown Price"} <br/>
                                    {platformData.install_base || "Unknown Install Base"} UNITS SOLD
                                </strong>
                            </center>
                        </div>
                        <div className='block'>
                            <div className="disabled">
                                <p dangerouslySetInnerHTML={{ __html: platformData.description || "" }} />
                            </div>
                        </div>
                    </div> 
                </center>
            )}
            </main>
        </>
    );
}

export default Platforms;