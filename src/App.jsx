import React, { useState, useEffect } from "react";

import "./App.scss";

const initMatrix = [];

const App = () => {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize, setMatrixSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState("o");
  const [selR, setSelR] = useState(null);
  const [selC, setSelC] = useState(null);
  const [winner, setWinner] = useState(false);
  const [reset, setReset] = useState(false);
  const [isShowReset, setIsShowReset] = useState(false);

  useEffect(() => {
    setWinner(false);
    setSelC(null);
    setSelR(null);

    const row = new Array(matrixSize).fill(null);
    const tempMatrix = [];

    for (let i = 0; i < matrixSize; i++) {
      tempMatrix.push([...row]);
    }

    setMatrix(tempMatrix);
  }, [reset]);

  const clickToSquare = (r, c) => {
    setIsShowReset(true);
    if (!matrix[r][c] & !winner) {
      setSelC(c);
      setSelR(r);
      let nextPlayer = currentPlayer === "x" ? "o" : "x";
      setCurrentPlayer(nextPlayer);
      const matrixCopy = [...matrix];
      matrixCopy[r][c] = nextPlayer;
      setMatrix(matrixCopy);
    }
  };

  const isWinner = () => {
    let vertical = true;
    let horizontal = true;
    let d1 = true;
    let d2 = true;

    if (selC === null || selR === null) {
      return;
    }

    for (let i = 0; i < matrixSize; i++) {
      if (matrix[i][selC] !== currentPlayer) {
        vertical = false;
      }

      if (matrix[selR][i] !== currentPlayer) {
        horizontal = false;
      }

      if (matrix[i][i] !== currentPlayer) {
        d1 = false;
      }

      if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
        d2 = false;
      }
    }

    if (vertical || horizontal || d1 || d2) {
      setWinner(true);
    }
  };

  useEffect(() => {
    if (!isWinner()) {
      isWinner();
    }
  }, [isWinner]);

  const resetGame = () => {
    setReset(!reset);
    setWinner(!winner);
    setCurrentPlayer("o");
    setIsShowReset(false);
  };

  return (
    <div className="app">
      <div className="app-container">
        <header>Tic Tac Toe</header>
        {isShowReset && (
          <button className="reset" onClick={resetGame}>
            Reset Game
          </button>
        )}
        <div>
          {matrix.map((val, c) => {
            return (
              <div className="row">
                {val.map((value, r) => {
                  return (
                    <div
                      className="box"
                      onClick={() => {
                        clickToSquare(r, c);
                      }}
                    >
                      {matrix[r][c]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        {winner && (
          <p className="info">{`Player ${currentPlayer} is a winner`}</p>
        )}
      </div>
    </div>
  );
};

export default App;
