import { useState } from "react";
import GameBoard from "./components/GameBoard";
import PlayerInfo from "./components/playerInfo";

function App() {

  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  function handleSelectSquare(rowIndex, columnIndex) {
    
    setActivePlayer((currentActivePlayer) => {
      return currentActivePlayer === 'X' ? 'O' : 'X'
    });

    setGameTurns((previousTurn) => {

      // Geting state of active player from previous turn added in player key
      let currentPlayer = 'X';
      if(previousTurn.length > 0 && previousTurn[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updateTurns = [
        {square: {row: rowIndex, col: columnIndex}, player: currentPlayer},
        ...previousTurn
      ];
      return updateTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo initialName="Player 1" symbol='X' isActive={activePlayer === 'X'}/>
          <PlayerInfo initialName="Player 2" symbol='O' isActive={activePlayer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare}
        turns={gameTurns} />
      </div>

    </main>
  );
}

export default App
