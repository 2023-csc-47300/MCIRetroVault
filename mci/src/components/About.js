import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';  
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';
import AuthService from '../services/AuthService';
import $ from 'jquery';

function AboutPage() {
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
                    url: `https://www.giantbomb.com/api/game/${game}`,
                    dataType: "jsonp",
                    jsonp: 'json_callback',
                    data: {
                        api_key: API_KEY,
                        format: 'jsonp',
                        field_list: 'description,image,images,name,original_release_date,publishers'
                    }
                });
                setGameData(response.results);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, [game]); // dependency array to make sure fetchData runs when `game` changes

    const handleLogout = () => {
        AuthService.logout();
        navigate('/search');
    };

    // Check if gameData is loaded
    if (!gameData) {
        return <div> Loading... </div>;
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
                                <Link to="/search" className="header-button">Search</Link>
                                <button onClick={handleLogout} className="header-button">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/signin" className="header-button">Sign In</Link>
                                <Link to="/signup" className="header-button">Sign Up</Link>
                                <Link to="/search" className="header-button">Search</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <body>

                <center>
                    <div className="header">
                        <strong> {gameData.name.toUpperCase()} </strong>
                    </div>
                    <div className='header'>
                        <img src={gameData.image.small_url} alt={gameData.name} />
                    </div>
                </center>

                <div className='block'>
                    <div className='desc'>
                        <center> <strong>
                        © {gameData.publishers[0].name.toUpperCase()} <br/>
                        {gameData.original_release_date}
                        </strong> </center>
                    </div>
                    <div className="block">
                        <button type="submit" className='like-button'> Like this game </button> <br/>
                    </div>
                    <div className='block'>
                        <div class="disabled"> <p dangerouslySetInnerHTML={{ __html: gameData.description }} /> </div>
                    </div>
                    <div className="images">
                        {/* add logic for image rendering - figure this part out later */}
                    </div>
                    <center>
                        <Link to={`/play/${platform}/${game}`}>
                            <button type="submit" className="play-button">Play Game</button>
                        </Link>
                    </center>
                </div>
            </body>
        </>
    );
}

export default AboutPage;
