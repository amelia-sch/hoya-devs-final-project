import React, { useState } from 'react';
import './App.css';

// Game Component
function App() {
  const [board, setBoard] = useState(Array(9).fill(null)); // Represents the board
  const [isXNext, setIsXNext] = useState(true); // Keeps track of whose turn it is
  const [winner, setWinner] = useState(null); // Tracks the winner (X, O, or null for no winner yet)

  // Winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check if the current player has won
  const checkWinner = (board) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  // Click on the board to select X or Os
  const handleClick = (index) => {
    if (board[index] || winner) return; // Prevent from clicking if the cell is already filled or if there's already a winner

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const currentWinner = checkWinner(newBoard);
    if (currentWinner) {
      setWinner(currentWinner); // Set winner
    }
  };

  // Reset the game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  // Render the  board
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Player turn: ${isXNext ? 'X' : 'O'}`}
      </div>
      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;

