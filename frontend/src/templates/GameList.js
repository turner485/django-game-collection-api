import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameForm from './GameForm';
import Button from '@mui/material/Button';

const GameList = () => {
    const [platforms, setPlatforms] = useState({});
    const [editingGame, setEditingGame] = useState(null);

    useEffect(() => {
        fetchGames();
    }, []);

    const fetchGames = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/');
            const platforms = response.data.platforms;
            setPlatforms(platforms);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    };

    const deleteGame = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/${id}/`);
            fetchGames();  // Refresh the list
        } catch (error) {
            console.error('Error deleting game:', error);
        }
    };

    const updateGame = async (id, updatedData) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/${id}/`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setEditingGame(null);
            fetchGames();  // Refresh the list
        } catch (error) {
            console.error('Error updating game:', error);
        }
    };

    const startEditing = (game) => {
        setEditingGame(game);
    };

    const cancelEdit = () => {
        setEditingGame(null);
    };

    return (
        <div>
            {editingGame ? (
                <GameForm
                    fetchGames={fetchGames}
                    gameToEdit={editingGame}
                    cancelEdit={cancelEdit}
                    updateGame={updateGame}
                />
            ) : (
                <GameForm fetchGames={fetchGames} />
            )}
            <div className='flex-box'>
                {Object.keys(platforms).map(platform => (
                    <div className='flex-item' key={platform}>
                        <div className='flex-item-inner'>
                            <div className='flex-item-bg'></div>
                            <h2 className='platform-header'>{platform.replace(/_/g, ' ')}</h2>
                            <ul>
                                {platforms[platform].map(game => (
                                    <li key={game.id}>
                                        {game.title}
                                        <Button sx={{ margin: '5px', padding: '2px', fontSize: '9px', minWidth: '50px'}} variant="contained" color="error" onClick={() => deleteGame(game.id)}>Delete</Button>
                                        <Button sx={{ margin: '0px', padding: '2px', fontSize: '9px', minWidth: '50px'}} variant="contained" color="success" onClick={() => startEditing(game)}>Update</Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameList;
