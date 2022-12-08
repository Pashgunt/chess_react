import React, { useEffect, useState } from 'react';
import "./App.css";
import BoardComponent from './components/BoardComponent';
import LostFigures from './components/LostFigures';
import { Board } from './models/Board';
import { Colors } from './models/Colors';
import { Players } from './models/Players';

function App() {

  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Players(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Players(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Players | null>(null);

  useEffect(() => {
    restart();
    setCurrentPlayer(whitePlayer);
  }, [])

  const restart = function restartInner() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
  }

  const swapPlayer = function innerSwapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className='app'>
      <BoardComponent
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures
          title='Чёрные фигуры'
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title='Белые фигуры'
          figures={board.lostWhiteFigures}
        />
      </div>
    </div>
  );
}

export default App;
