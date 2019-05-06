import React from 'react';
import classes from './Square.module.css';
const Square = props=>{
    const classArr = [classes.Square,props.highlight?classes.Highlight:null];
    return(
        <button onClick={props.onClick} className={classArr.join(" ")}>{props.value}</button>
    )
}

export default Square;