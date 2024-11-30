import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const N = 8;
const moveX = [2, 1, -1, -2, -2, -1, 1, 2];
const moveY = [1, 2, 2, 1, -1, -2, -2, -1];

// Verifică dacă mișcarea este validă
function isValidMove(x, y, board) {
  return x >= 0 && y >= 0 && x < N && y < N && board[x][y] === -1;
}

// Numără mișcările valide posibile
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

// Funcția recursivă pentru turul calului
function knightTour(x, y, moveCount, board, moveHistory) {
  if (moveCount === N * N) return true;

  let moveOptions = [];
  // Căutăm mișcările posibile
  for (let i = 0; i < 8; i++) {
    const nextX = x + moveX[i];
    const nextY = y + moveY[i];
    if (isValidMove(nextX, nextY, board)) {
      const validMovesCount = getValidMovesCount(nextX, nextY, board);
      moveOptions.push({ move: i, x: nextX, y: nextY, validMovesCount });
    }
  }

  // Sortăm mișcările pentru a alege calea cu cele mai puține opțiuni
  moveOptions.sort((a, b) => a.validMovesCount - b.validMovesCount);

  for (let i = 0; i < 8; i++) {
    const { x: nextX, y: nextY } = moveOptions[i];
    board[nextX][nextY] = moveCount;
    moveHistory.push([nextX, nextY]);

    // Recursivitate
    if (knightTour(nextX, nextY, moveCount + 1, board, moveHistory)) {
      return true;
    }

    // Backtracking
    board[nextX][nextY] = -1;
    moveHistory.pop();
  }

  return false;
}

function App() {
  //useState - hook, foloseste starea(datele pot fi actualizate)

  //.fill() - umple array-ul cu undefined 
  //.map(() => Array(N).fill(-1)) - pentru fiecare element din array cream un alt array toate val -1
  const [board, setBoard] = useState(Array(N).fill().map(() => Array(N).fill(-1)));
  //in moves stocam miscarile calului; - initial un array go;
  const [moves, setMoves] = useState([]);
  //currentMoves urmareste pozitia curenta a calului - initial 0 adica calul nu a facut nici o miscare
  const [currentMove, setCurrentMove] = useState(0);
  //useRed - pastreaza o valoare care nu are nevoie de randarea componentei cand se schimba
  //pastreaza istoricul miscarilor calului
  const moveHistoryRef = useRef([]);

  useEffect(() => {
    const initialBoard = Array(N).fill().map(() => Array(N).fill(-1));
    const startX = Math.floor(Math.random() * N);
    const startY = Math.floor(Math.random() * N);
    initialBoard[startX][startY] = 0;
    setBoard(initialBoard);
    setMoves([[startX, startY]]);
    moveHistoryRef.current = [[startX, startY]];

    // Începem turul calului
    if (knightTour(startX, startY, 1, initialBoard, moveHistoryRef.current)) {
      setMoves(moveHistoryRef.current);
    }
  }, []);

  useEffect(() => {
    if (moves.length > currentMove) {
      const timer = setTimeout(() => {
        setCurrentMove((prev) => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentMove, moves]);

  return (
    <div className="app">
      <div className="titleText">
        <h1 className="titlu">Circuitul Calului</h1>
      </div>
      <div className="mainContent">
        <div className="boardAndMoves">
          <div className="boardWrapper">
            <div className="colLabelsTop">
              {Array.from({ length: N }).map((_, index) => (
                <div key={index} className="colLabel">{index}</div>
              ))}
            </div>
            <div className="rowLabelsLeft">
              {Array.from({ length: N }).map((_, index) => (
                <div key={index} className="rowLabel">{index}</div>
              ))}
            </div>
            <div className="board">
              {Array.from({ length: N }).map((_, row) => (
                <div key={row} className="row">
                  {Array.from({ length: N }).map((_, col) => {
                    const isKnight = row === moves[currentMove]?.[0] && col === moves[currentMove]?.[1];
                    const isVisited = moves.slice(0, currentMove).some(([x, y]) => x === row && y === col);
                    return (
                      <div
                        key={col}
                        className={`square ${(row + col) % 2 === 0 ? 'white' : 'black'} ${isKnight ? 'knight' : ''} ${isVisited ? 'visited' : ''}`}
                        style={isVisited ? { opacity: 0.3 } : {}}
                      >
                        {isKnight ? '♞' : ''}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="moves">
            <h2>Mutările calului:</h2>
            <ul>
              {moves.map(([x, y], index) => (
                <li key={index}>
                  <div className="move">
                    <span className="moveNumber">Mutarea {index + 1}:<br /></span>
                    <span className="coordinates">({x}, {y})</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
