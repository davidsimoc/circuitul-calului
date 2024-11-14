import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './App.css'
const N = 8;

const moveX = [2, 1, -1, -2, -2, -1, 1, 2];
const moveY = [1, 2, 2, 1, -1, -2, -2, -1];

function isValidMove(x,y, board) {
    return x >= 0 && y>=0 && x < N && y < N && board[x][y] === -1;
}

function App() {
  return (
    <div className="App">
      <h1>Hello, world!</h1>
    </div>
  );
}


// function App() {

//     return (
//         <div className="board">
//             {Array.from({ length: N }).map((_, row) => (
//                 <div key={row} className="row">
//                     {Array.from({ length: N }).map((_, col) => {
//                         const isKnight = row === moves[currentMove]?.[0] && col === moves[currentMove]?.[1];
//                         return (
//                             <div key={col} className={`square ${isKnight ? 'knight' : ''}`}>
//                                 {isKnight && '♞'}
//                             </div>
//                         );
//                     })}
//                 </div>
//             ))}
//         </div>
//     );
// }

export default App;
