import React from 'react';
import './App.css';
import GameList from './templates/GameList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header'>My Game Collection</h1>
      </header>
      <GameList />
    </div>
  );
}

export default App;
