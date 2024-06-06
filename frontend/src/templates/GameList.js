import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameForm from './GameForm';

const GameList = () => {
    const [platforms, setPlatforms] = useState({});

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/');
            const platforms = response.data.platforms;
            setPlatforms(platforms);
            console.log(platforms);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    return (
        <div>
            <h1 className='game-header'>Game List</h1>
            <div className='flex-box'>
                {Object.keys(platforms).map(platform => (
                    <div key={platform} className='flex-item'>
                        <h2 className='platform-header'>{platform.replace(/_/g, ' ')}</h2>
                        <ul>
                            {platforms[platform].map(game => (
                                <li key={game.id}>
                                    {game.title} - {game.platform}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <GameForm fetchGames={fetchGames} />
        </div>
    );
};

export default GameList;
