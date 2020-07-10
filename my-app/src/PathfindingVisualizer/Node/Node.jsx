import React, {Component} from 'react';
import './Node.css';

//Main class to create nodes
export default class Node extends Component {
    //Sends data to app. Whenever you render a node it renders all the following properties
    render() {
        //Creates variables to store in every instance of Node
        const {
            //column
            col,
            //is the node the finish node
            isFinish,
            //is the node the start node
            isStart,
            //is the node a wall
            isWall,
            //what happens to the node when the mouse is clicked
            onMouseDown,
            //what happens when you hover over the node
            onMouseEnter,
            //what happens when you release the mouse
            onMouseUp,
            //row
            row,
        } = this.props;

        // Ternary operator, basically if statement. extraClassName is isFinish only if it is 'node-finish
        // Extra class name is if it is a special node.
        const extraClassName = isFinish
        ? 'node-finish'
        : isStart
        ? 'node-start'
        : isWall
        ? 'node-wall'
        : '';

        // Returns all the necessary data when you create a node
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
