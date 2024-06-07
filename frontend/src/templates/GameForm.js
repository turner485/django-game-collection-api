import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const GameForm = ({ fetchGames, gameToEdit, cancelEdit, updateGame }) => {
    const [formData, setFormData] = useState({
        title: '',
        platform: '',
        release_date: '',
        developer: '',
        publisher: '',
        genre: ''
    });

    useEffect(() => {
        if (gameToEdit) {
            setFormData({
                title: gameToEdit.title,
                platform: gameToEdit.platform,
                release_date: gameToEdit.release_date,
                developer: gameToEdit.developer,
                publisher: gameToEdit.publisher,
                genre: gameToEdit.genre
            });
        }
    }, [gameToEdit]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (gameToEdit) {
            await updateGame(gameToEdit.id, formData);
        } else {
            try {
                await axios.post('http://localhost:8000/api/', formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': 'csrftoken'
                    }
                });
                fetchGames();
                setFormData({
                    title: '',
                    platform: '',
                    release_date: '',
                    developer: '',
                    publisher: '',
                    genre: ''
                });
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <Box component="div"
            sx={{
                padding: '10px'
            }}
            noValidate
            autoComplete='off'
        >
            <h2>{gameToEdit ? "Edit Game" : "New Entry"}</h2>
            <form onSubmit={handleSubmit}>
                <div className='inner-form'>
                    <TextField id="outlined-basic" label="Title" variant="outlined" type="text" name="title" value={formData.title} onChange={handleChange} required/>
                    <TextField id="outlined-basic" label="Platform" variant="outlined" type="text" name="platform" value={formData.platform} onChange={handleChange} required />
                    <TextField id="outlined-basic" variant="outlined" type="date" name="release_date" value={formData.release_date} onChange={handleChange} required />
                    <TextField id="outlined-basic" label="Developer" variant="outlined" type="text" name="developer" value={formData.developer} onChange={handleChange} required />
                    <TextField id="outlined-basic" label="Publisher" variant="outlined" type="text" name="publisher" value={formData.publisher} onChange={handleChange} required />
                    <TextField id="outlined-basic" label="Genre" variant="outlined" type="text" name="genre" value={formData.genre} onChange={handleChange} required />
                </div>
                <Button sx={{ margin: '10px' }} variant="contained" color="success" type='submit'>
                    {gameToEdit ? "Update Game" : "Add Game"}
                </Button>
                {gameToEdit && (
                    <Button sx={{ margin: '10px' }} variant="contained" color="secondary" onClick={cancelEdit}>
                        Cancel
                    </Button>
                )}
            </form>
        </Box>
    );
};

export default GameForm;
