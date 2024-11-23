import React, { useState, useEffect } from 'react'
import './App.css'
const N = 8;

const moveX = [2, 1, -1, -2, -2, -1, 1, 2];
const moveY = [1, 2, 2, 1, -1, -2, -2, -1];

function isValidMove(x, y, board) {
  return x >= 0 && y >= 0 && x < N && y < N && board[x][y] === -1;
}

function knightTour(x, y, moveCount, board, moves) {
  if (moveCount === N * N) return true; //Toate pozitiile au fost acoperite
  for (let i = 0; i < 8; i++) {
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
  console.log("Componenta App s-a montat"); // Trebuie să apară în consolă

  const [board, setBoard] = useState(Array(N).fill().map(() => Array(N).fill(-1)));
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);

  useEffect(() => {
    const initialBoard = Array(N).fill().map(() => Array(N).fill(-1));
    initialBoard[0][0] = 0;
    const tourMoves = [[0, 0]];
    const found = knightTour(0, 0, 1, initialBoard, tourMoves);

    //knightTour(0, 0, 1, initialBoard, tourMoves);
    if(found) {
      console.log('Tour moves:', tourMoves); // Debugging
      setBoard(initialBoard);
      setMoves(tourMoves);
    }
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
    <div className='app'>
      <div className='titleAndBoard'>
        <div className='titleText'>
          <h1 className='titlu'>Circuitul Calului</h1>
        </div>
        <div className='boardAndMoves'>
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
          <div className='moves'>
            <h2>Moves:</h2>
            <ol>
              {moves.map(([row, col], index) => {
                        console.log(`Move ${index + 1}: (${row + 1}, ${col + 1})`); // Debugging

                <li key={index} className={index === currentMove ? 'current-move' : ''}>
                  Move {index + 1}: ({row + 1}, {col + 1})
                </li>
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
