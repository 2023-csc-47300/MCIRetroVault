import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import AuthService from '../services/AuthService';
import $ from 'jquery';

function PlayPage() {
    const navigate = useNavigate();
    const { platform, game } = useParams();
    const [gameData, setGameData] = useState(null);

    const safeParse = (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            return null;
        }
    };
    const user = safeParse(localStorage.getItem('user'))
    const API_KEY = "b6ea6721c015a9b5e39764279ff22a4c18802e3d"; // Miguel's API key

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await $.ajax({
                    url: `https://www.giantbomb.com/api/games/${game}`,
                    dataType: "jsonp",
                    jsonp: 'json_callback',
                    data: {
                        api_key: API_KEY,
                        format: 'jsonp',
                        field_list: 'name,deck,image'
                    }
                });
                setGameData(response.results[0]);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }
        fetchData();
    }, [game, platform]);

    const handleLogout = () => {
        AuthService.logout();
        navigate('/');
    };

    if (!gameData) {
        return <div>Loading...</div>;
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
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="header-button">Sign In</Link>
                                <Link to="/signup" className="header-button">Sign Up</Link>
                            </>
                        )}
                        <Link to="/search" className="header-button">Search</Link>
                    </div>
                </div>
            </header>

            <div className="game-container">
                <center>
                    <div className="header">
                        <strong>PLAY {gameData.name.toUpperCase()}</strong>
                    </div>
                </center>

                <div className='game-details'>
                    <center>
                        <img src={gameData.image.small_url} alt={gameData.name} />
                    </center>
                    <div className="game-likes">
                        <button type="button" className='like-button'>Like this game</button>
                    </div>
                    <div className='game-description'>
                        <p dangerouslySetInnerHTML={{ __html: gameData.deck }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlayPage;
