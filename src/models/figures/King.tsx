import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/b_king.svg"
import whiteLogo from "../../assets/w_king.svg"

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target))
            return false;
        if (!this.cell.isEmptyVerical(target))
            return true;
        return false;
    }
}