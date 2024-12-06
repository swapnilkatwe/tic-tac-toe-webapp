import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];


export default function GameBoard({onSelectSquare, turns}) {

    let gameBoard = initialGameBoard;

    for(const turn of turns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleUserInput(rowIndex, columnIndex) {
    //     setGameBoard((previousValue) => {
    //         const updatedBoard = [...previousValue.map((eachColumn)=>[...eachColumn])];
    //         updatedBoard[rowIndex][columnIndex] = activePlayerSymbol;
    //         return updatedBoard;
    //     });
    //     console.log(activePlayerSymbol);
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) =>
            (<li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, columnIndex) => (
                        <li key={columnIndex}>
                            <button onClick={() =>onSelectSquare(rowIndex, columnIndex)}>{playerSymbol}</button>
                        </li>
                    ))}
                </ol>
            </li>)
            )}
        </ol>
    );
}
