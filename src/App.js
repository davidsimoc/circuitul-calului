import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
const N = 8;

const moveX = [2, 1, -1, -2, -2, -1, 1, 2];
const moveY = [1, 2, 2, 1, -1, -2, -2, -1];

function isValidMove(x, y, board) {
  return x >= 0 && y >= 0 && x < N && y < N && board[x][y] === -1;
}

function knightTour(x, y, moveCount, board, moves) {
  if (moveCount == N * N) return true; //Toate pozitiile au fost acoperite
  for (let i = 0; i < N; i++) {
    const nextX = x + moveX[i];
    const nextY = y + moveY[i];
    if (isValidMove(nextX, nextY, board)) {
      board[nextX][nextY] = moveCount;
      moves.push([nextX, nextY]);
      if (knightTour(nextX, nextY, moveCount + 1, board, moves)) return true;
      board[nextX][nextY] = -1;
      moves.pop();
    }
  }
  return false;
}

function App() {
  const [board, setBoard] = useState(Array(N).fill().map(() => Array(N).fill(-1)));
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);

  useEffect(() => {
    const initialBoard = Array(N).fill().map(() => Array(N).fill(-1));
    initialBoard[0][0] = 0;
    const tourMoves = [[0, 0]];
    knightTour(0, 0, 1, initialBoard, tourMoves);
    setBoard(initialBoard);
    setMoves(tourMoves);
  }, [])

  useEffect(() => {
    if (currentMove < moves.length) {
      const timer = setTimeout(() => {
        setCurrentMove((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentMove, moves]);

  return (
    <div className='background'>
      <div className="board">
        {Array.from({ length: N }).map((_, row) => (
          <div key={row} className="row">
            {Array.from({ length: N }).map((_, col) => {
              const isKnight = row === moves[currentMove]?.[0] && col === moves[currentMove]?.[1];
              return (
                <div key={col} className={`square ${(row + col) % 2 === 0 ? 'white' : 'black'} ${isKnight ? 'knight' : ''}`}>
                  {isKnight && '♞'}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
