import React, { FC, useState } from 'react';
import "../App.css";
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board,
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSellectedCell] = useState<Cell | null>(null)

  const click = function innerClick(cell: Cell) {
    if(cell.figure)
      setSellectedCell(cell);
  }

  const highlightCells = function innerHighloghtCells(){
    // board.hilightCells();
  }

  function updateBoard(){
    const newBoard = board.getCopyBoard();
    // setBoard(newBoard);
  }

  return (
    <div className="board">
      {board.cells && board.cells.map((row, index) => {
        return <React.Fragment key={index}>
          {row.map((cell) => {
            return <CellComponent 
            key={cell.id} 
            cell={cell} 
            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
            click={click}
            />
          })}
        </React.Fragment>
      })}
    </div>
  )
}

export default BoardComponent;
