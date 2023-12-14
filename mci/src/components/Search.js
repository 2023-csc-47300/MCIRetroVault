import React from 'react';
import { Link } from 'react-router-dom';  
import MCIRetroVaultImage from '../img/MCIRetro_Vault.png';

import { useState, useEffect } from 'react';
import $ from 'jquery';

function HomePage() {

    const [gameName, setGameName] = useState('');

    const [platformName, setPlatformName] = useState("");
    const [platformID, setPlatformID] = useState(0);

    const [gameData, setGameData] = useState([]);

    const API_KEY = "b6ea6721c015a9b5e39764279ff22a4c18802e3d"; // Miguel's API key
    const QUERY = `http://www.giantbomb.com/api/games/?api_key=${ API_KEY }&format=json&filter=name:${ gameName },platforms:${ platformID }`;

    const handleNameChange = (e) => {
        setGameName(e.target.value);
    };

    const handlePlatformChange = (e) => {

        setPlatformName(e.target.value);

        // Giant Bomb ID's for game consoles: update list when adding more consoles!
        const NES = 21;
        const SNES = 9;
        const Genesis = 6;

        var ID;
        switch(e.target.value){
            case "NES": ID = NES; break;
            case "SNES": ID = SNES; break;
            case "Genesis": ID = Genesis; break;
            default: ID = 0; break;
        }

        setPlatformID(ID);
        
    };

    const debounce = (func, delay) => { // function that delays function call by certain number of milliseconds
        let debounceTimer 
        return function() { 
            const context = this
            const args = arguments 
                clearTimeout(debounceTimer) 
                    debounceTimer 
                = setTimeout(() => func.apply(context, args), delay) 
          } 
    }

    useEffect(() => {
        if(gameName.length >= 2){
            $.ajax({
                url: `https://www.giantbomb.com/api/games/`,
                dataType: "jsonp",
                jsonp: 'json_callback',
                data: {
                    api_key: API_KEY,
                    filter: `name:${ gameName },platforms:${ platformID }`,
                    format: 'jsonp',
                    field_list: 'name,platforms,image,aliases,deck,description'
                },
                success: function(res) {
                    setGameData(res.results);
                    console.log(res);
                }
            });
        }
        else{
            setGameData([]);
        }
      }, [gameName, platformID]);
    
      function checkEmptyResults() {
        if(gameData.length === 0 && gameName.length > 0){
          return (<div> No results found. </div>)
        }
      }
    
      function checkErr(error){
          console.log(error);
          return (<div> Error: { error } </div>)
      }  

    return (
        <>
        <header>
            <div className="header-container">
            <div className="header-left">
                <img src={MCIRetroVaultImage} alt="MCIRetro Vault" style={{ width: '100px', height: 'auto' }} />
                <h1>Welcome to MCIRetroVault Website</h1>
            </div>
            <div className="header-right">
                <Link to="/signin" className="header-button">Sign In</Link>
                <Link to="/signup" className="header-button">Sign Up</Link>
                <Link to="/search" className="header-button">Search</Link>
            </div>
            </div>
        </header>

        <main>
            <center>

            <br/> <label htmlFor="myInput"> What game are you looking for? </label> <br/>
            <input type="text" id="name" name="name" value={gameName} onChange={handleNameChange} /> <br/>
            
            <label for="platforms"> Choose a platform: </label> <br/>
            <select name="platforms" id="platforms" value={platformName} onChange={handlePlatformChange}>
            <option value="all">All</option>
            <option value="NES">NES</option>
            <option value="SNES">SNES</option>
            <option value="Genesis">Genesis</option>
            </select> <br/>

            </center>

        </main>

        <body>
            <center>

                { checkEmptyResults() }
                { gameData.map((game) => {

                    return(
                    <div className="card"> 

                        <div class="card-header"> <strong> { game.name } </strong> </div>
                        <div class="card-body">
                        <img src={ game.image.tiny_url }/>
                            
                        </div>
                    
                    </div>
                    )

                })}
            </center>
        </body>

        </>
    );
}

export default HomePage;