import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameForm from './GameForm';

const GameList = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/');
            const games = Object.values(response.data).flatMap(platform => platform);
            setGames(games);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    return (
        <div>   
            <ul>
                <h1 className='game-header'>Game List</h1>
                {games.map(game => (
                    <li key={game.id}>
                        {game.title} - {game.platform}
                    </li>
                ))}
            </ul>
            <GameForm fetchGames={fetchGames} />
        </div>
    );
};

export default GameList;
