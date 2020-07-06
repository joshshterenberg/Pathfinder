import React, {Component} from 'react';
import './Node.css';

//Main class to create nodes
export default class Node extends Component {
    //Sends data to app
    render() {
        //Creates variables to store in every instance of Node
        const {
            col,
            isFinish,
            isStart,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
            row,
        } = this.props;

        // Ternary operator, basically if statement. It's isFinish only if it is 'node-finish
        const extraClassName = isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : '';

        // Returns all the necessary data
        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp()}></div>
        );
    }
}
