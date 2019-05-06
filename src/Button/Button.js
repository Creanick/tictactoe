import React from 'react';
import classes from './Button.module.css';
const Button = props=>{
    const classArr = [classes.Button,props.active?classes.active:null]
    return(
        <button className={classArr.join(" ")} onClick={props.click}>{props.children}</button>
    )
}

export default Button;