import React, { FC, useEffect, useState } from 'react';
import "../App.css";
import { Board } from '../models/Board';
import { Cell } from '../models/Cell';
import { Players } from '../models/Players';
import CellComponent from './CellComponent';

interface BoardProps {
  board: Board,
  setBoard: (board: Board) => void;
  currentPlayer: Players | null;
  swapPlayer: () => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard, currentPlayer, swapPlayer }) => {
  const [selectedCell, setSellectedCell] = useState<Cell | null>(null)

  const click = function innerClick(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSellectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSellectedCell(cell);
      }
    }
  }

  const highlightCells = function innerHighloghtCells() {
    board.hilightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell])

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells && board.cells.map((row, index) => {
          return <React.Fragment key={index}>
            {row.map((cell) => {
              return <CellComponent
                key={cell.id}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y && !!cell?.figure}
                click={click}
              />
            })}
          </React.Fragment>
        })}
      </div>
    </div>
  )
}

export default BoardComponent;
