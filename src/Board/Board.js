import React from 'react';
import Square from '../Square/Square';
import classes from './Board.module.css';
const Board = props=>{
    const rows = [];
    for(let i=0;i<3;i++){
        const squares = [];
        for(let j=i*3;j<(i*3)+3;j++){
            squares.push(<Square highlight={props.highlightBox[j]} value={props.move[j]} key={j} onClick={()=>props.onClick(j)}/>)
        }
        rows.push(<div key={i} className={classes.BoardRow}>{squares}</div>)
    }

    return(
        <div className={classes.Board}>
            <div className={classes.Status}>
                {props.status}
            </div>
            {rows}
        </div>
    )
}
export default Board;