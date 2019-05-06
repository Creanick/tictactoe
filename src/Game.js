import React,{Component} from 'react';
import classes from './Game.module.css';
import Board from './Board/Board';
import Button from './Button/Button';
const initialState = {
    history:[
        {box: Array(9).fill(null)}
    ],
    xIsNext: true,
    stepNumber: 0,
    moveSortToggle: false
}
class Game extends Component{
    state={...initialState}
    calculateWinner = (box)=>{
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if(box[a] && box[a] === box[b] && box[a] === box[c]){
                return box[a]
            }
        }
        return null;
    }
    winningSquare = (box)=>{
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if(box[a] && box[a] === box[b] && box[a] === box[c]){
                return lines[i]
            }
        }
        return []
    }
    getCurrentBox = ()=>{
        return (this.state.history[this.state.stepNumber]).box
    }
    boxClickHandler = (i)=>{
        const currentBox = this.getCurrentBox();
        if(currentBox[i] || this.calculateWinner(currentBox)){
            return;
        }
        const mark = this.state.xIsNext? "X":"O"
        this.setState(prevState=>{
            const newHistory = prevState.history.slice(0,prevState.stepNumber+1)
            const newBox = [...(newHistory[newHistory.length-1]).box]
            newBox[i] = mark;
            newHistory.push({box: newBox})
            return {xIsNext: !prevState.xIsNext,history:newHistory,stepNumber: prevState.stepNumber+1}
        })
    }
    isGameOver = (box)=>{
        for (let i = 0; i < box.length; i++) {
            const value = box[i];
            if(!value){
                return false
            }
        }
        return true;
    }
    resetGame = ()=>{
        this.setState(initialState)
    }
    jumpTo = (i)=>{
        this.setState({stepNumber: i,xIsNext: i%2 === 0})
    }
    render(){
        console.log(this.state.history)
        const currentBox = this.getCurrentBox();
        let winner = this.calculateWinner(currentBox);
        let status = null;
        let playAgain = null;
        if(winner){
            status = "Winner is : "+winner;
            playAgain = <Button click={this.resetGame}>Play Again</Button>
        }else{
            if(this.isGameOver(currentBox)){
                status = "Game Tied"
                playAgain = <Button click={this.resetGame}>Play Again</Button>
            }else{
                status = "Next Player : "+(this.state.xIsNext? "X":"O")
            }
        }
        let highlightBox = Array(9).fill(false);
        if(winner){
            const winnerSquareArr = this.winningSquare(currentBox);
            const [a,b,c] = winnerSquareArr;
            if(winnerSquareArr.length > 0){
                highlightBox[a] = highlightBox[b] = highlightBox[c] = true;
            }
        }
        let moveButtons = [];
        for(let i=0;i<this.state.history.length;i++){
            let j = 0;
            if(this.state.moveSortToggle){
                j = this.state.history.length - 1 -i;
            }else{
                j=i
            }
            moveButtons.push(<Button active={this.state.stepNumber === j} key={j} click={()=>this.jumpTo(j)}>Go to Move {j}</Button>)
        }
        return (
            <div className={classes.Game}>
                <Board highlightBox={highlightBox} status={status}move={currentBox} onClick={this.boxClickHandler}/>
                {playAgain}
                <div className="moveHistory">
                    {moveButtons}
                </div>
                <Button click={()=>this.setState(prevState=>({moveSortToggle:!prevState.moveSortToggle}))} >Sort Move List</Button>
            </div>
        )
    }
}

export default Game;