import React from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';  
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import AuthService from '../services/AuthService'; // importing AuthService

import { useState, useEffect } from 'react';
import $ from 'jquery';

function AboutPage() {
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
        AuthService.logout();
        navigate('/search');
    };

    const { platform, game } = useParams();
    const [gameData, setGameData] = useState([]);

    const API_KEY = "b6ea6721c015a9b5e39764279ff22a4c18802e3d"; // Miguel's API key

    async function fetchData() {
        const data = await $.ajax({
            url: `https://www.giantbomb.com/api/game/${ game }`,
            dataType: "jsonp",
            jsonp: 'json_callback',
            data: {
                api_key: API_KEY,
                format: 'jsonp',
                field_list: 'description,image,images,name,original_release_date,publishers'
            }
        });
        return data;
    }

    async function loadData(){
        const gameData = await fetchData();
            return (
                <body>
                    <div class="header">
                        <strong> { gameData.name.toUpperCase() } </strong>
                        <img src={ gameData.image.small_url }/>
                    </div>
                    <div class="desc">
                        Game by { gameData.publishers[0] }
                        Released {gameData.original_release_date}
                        { gameData.description }
                    </div>
                    <div class="images">
                        {gameData.images[0]}
                        {gameData.images[10]}
                        {gameData.images[20]}
                    </div>
                    <Link to={`/play/${ platform }/${ game }`}>
                        <button type="submit" className="signin-button">Play Game</button>
                    </Link>
                </body>
            );
    }


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

            { loadData() }

        </>
    );
}

export default AboutPage;