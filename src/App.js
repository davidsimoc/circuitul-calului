import React, { useState, useEffect } from 'react'
import './App.css'
const N = 8;

const moveX = [2, 1, -1, -2, -2, -1, 1, 2];
const moveY = [1, 2, 2, 1, -1, -2, -2, -1];

function isValidMove(x, y, board) {
  return x >= 0 && y >= 0 && x < N && y < N && board[x][y] === -1;
}

function getValidMovesCount(x, y, board) {
  let count = 0;
  for (let i = 0; i < 8; i++) {
    const nextX = x + moveX[i];
    const nextY = y + moveY[i];
    if (isValidMove(nextX, nextY, board)) {
      count++;
    }
  }
  return count;
}

function knightTour(x, y, moveCount, board, moves) {
  if (moveCount === N * N) return true; //Toate pozitiile au fost acoperite

  //Cream o lista cu mutarile posibile(indexuri) si o sortam
  let moveOptions = [];
  for (let i = 0; i < 8; i++) {
    const nextX = x + moveX[i];
    const nextY = y + moveY[i];
    if (isValidMove(nextX, nextY, board)) {
      const validMovesCount = getValidMovesCount(nextX, nextY, board);
      moveOptions.push({ move: i, x: nextX, y: nextY, validMovesCount });
    }
  }
  console.log(moveOptions); // Vezi ce conține array-ul

  //Sortam mutariile in ordine crescatoare
  moveOptions.sort((a, b) => a.validMovesCount - b.validMovesCount);

  //Iteram si incercam sa gasim o solutie
  for (let i = 0; i < 8; i++) {
    const { x: nextX, y: nextY } = moveOptions[i];
    board[nextX][nextY] = moveCount;
    moves.push([nextX, nextY]);
    if (knightTour(nextX, nextY, moveCount + 1, board, moves)) return true;

    //backtracking: anulam mutarea
    board[moveX][moveY] = -1;
    moves.pop();
  }
  return false;
}

function App() {
  const [board, setBoard] = useState(Array(N).fill().map(() => Array(N).fill(-1)));
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);

  useEffect(() => {
    const initialBoard = Array(N).fill().map(() => Array(N).fill(-1));

    //Alege aleatoriu un punct de start pentru cal
    const startX = Math.floor(Math.random() * N);
    const startY = Math.floor(Math.random() * N);

    initialBoard[startX][startY] = 0;
    const tourMoves = [[startX, startY]];
    const found = knightTour(startX, startY, 1, initialBoard, tourMoves);

    //knightTour(0, 0, 1, initialBoard, tourMoves);
    if (found) {
      console.log('Tour moves:', tourMoves); // Debugging
      setBoard(initialBoard);
      setMoves(tourMoves);
    }
  }, [])

  useEffect(() => {
    if (currentMove < moves.length) {
      console.log("Mutările salvate:", moves);

      const timer = setTimeout(() => {
        setCurrentMove((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentMove, moves]);

  return (
    <div className='app'>
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
        <div className="moves">
          <h2>Mutările calului:</h2>
          <ul>
            {moves.map(([x, y], index) => (
              <li key={index}>
                Mutare {index + 1}: ({x}, {y})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
  
}

export default App;
