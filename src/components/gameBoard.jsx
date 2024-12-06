import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


export default function GameBoard({onSelectSquare, activePlayerSymbol}) {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);

    function handleUserInput(rowIndex, columnIndex) {
        setGameBoard((previousValue) => {
            const updatedBoard = [...previousValue.map((eachColumn)=>[...eachColumn])];
            updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
            return updatedBoard;
        });
        console.log(activePlayerSymbol);
        onSelectSquare();
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
            (<li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) => (
                        <li key={columnIndex}>
                            <button onClick={() => handleUserInput(rowIndex, columnIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
            </li>)
            )}
        </ol>
    );
}
