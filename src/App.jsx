import { useState } from "react";
import GameBoard from "./components/GameBoard";
import PlayerInfo from "./components/playerInfo";
import Log from "./components/log";
import {WINNING_COMBINATIONS} from "./winning-combinations"
import GameOver from "./components/gameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  let winner = null;

  for(const combination of WINNING_COMBINATIONS) {
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol
        && firstSquareSymbol === secondSquareSymbol
        && firstSquareSymbol === thirdSquareSymbol) {
          winner = firstSquareSymbol;
      }
  } 

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((previousTurn) => {

      // Geting state of active player from previous turn added in player key
      const currentPlayer = deriveActivePlayer(previousTurn);

      const updateTurns = [
        { square: { row: rowIndex, col: columnIndex }, player: currentPlayer },
        ...previousTurn
      ];
      return updateTurns;
    });
  }

  function handleResart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo initialName="Player 1" symbol='X' isActive={activePlayer === 'X'} />
          <PlayerInfo initialName="Player 2" symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        
        {(winner || hasDraw )&& <GameOver winner={winner} onRestart={handleResart}/>}
        
        <GameBoard onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
