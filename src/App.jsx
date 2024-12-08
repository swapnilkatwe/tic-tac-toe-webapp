import { useState } from "react";
import GameBoard from "./components/GameBoard";
import PlayerInfo from "./components/playerInfo";
import Log from "./components/log";
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/gameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
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

function derivedGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function derivedWinner(gameBoard, players) {
  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol
      && firstSquareSymbol === secondSquareSymbol
      && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}


function App() {

  const [players, setPlayers] = useState(PLAYERS);

  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = derivedGameBoard(gameTurns);

  const winner = derivedWinner(gameBoard, players);

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

  function handlerPlayerName(symbol, newName) {
    setPlayers(previousPlayers => {
      return {
        ...previousPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <PlayerInfo initialName={PLAYERS.X} symbol='X' isActive={activePlayer === 'X'}
            onChangeName={handlerPlayerName}
          />
          <PlayerInfo initialName={PLAYERS.O} symbol='O' isActive={activePlayer === 'O'}
            onChangeName={handlerPlayerName}
          />
        </ol>

        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleResart} />}

        <GameBoard onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App
