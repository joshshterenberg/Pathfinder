// Standard imports
import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {breadthFirstSearch, getNodesInShortestPath} from '../algorithms/breadthFirstSearch';
import './PathfindingVisualizer.css';

//Definition of constants
const START_ROW = 10;
const START_COL = 15;
const FINISH_ROW = 10;
const FINISH_COL = 35;

//Main component that we are exporting to the app has basically 3 tings: construct, methods, and render.
export default class PathfindingVisualizer extends Component {

    //Constructor
    constructor() {
        super();
        this.state = {
            // 2 variables for the grid and if the mouse is clicked for every instance of the visualizer
            grid: [],
            mouseIsPressed: false,
        };
    }

    //Builds a grid
    componentDidMount() {
        const grid = getInitialGrid();
        this.setState({grid});
    }

    //Checks to see if the mouse is pressed
    handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid, mouseIsPressed: true});
    }

    //Something about the mouse
    handleMouseEnter(row, col) {
        if (!this.state.mouseIsPressed) return;
        const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
        this.setState({grid: newGrid});
    }

    //Checks to see of the mouse is released
    handleMouseUp() {
        this.setState({mouseIsPressed: false});
    }

    //Animates the blue squares
    animate(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
                //Timeout runs a program after a certain amount of time
                setTimeout(() => {this.animateShortestPath(nodesInShortestPathOrder);}, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
            }, 10 * i);
        }
    }

    //Animates the yellow path
    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path';
            }, 50 * i);
        }
    }

    //Visualizes when the button is clicked
    visualizeDijkstra() {
        const {grid} = this.state;
        const startNode = grid[START_ROW][START_COL];
        const finishNode = grid[FINISH_ROW][FINISH_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animate(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    visualizeBreadthFirstSearch() {
        const {grid} = this.state;
        const startNode = grid[START_ROW][START_COL];
        const finishNode = grid[FINISH_ROW][FINISH_COL];
        const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPath(finishNode);
        this.animate(visitedNodesInOrder, nodesInShortestPathOrder);

    }

    resetGrid() {
        window.location.reload(false);
    }
    //Renders the app and its elements (what's in the return statement)
    render() {
        const {grid, mouseIsPressed} = this.state;
        return (
            <>
            <button onClick={() => this.resetGrid()}>
                Reset
            </button>
            <button onClick={() => this.visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <button onClick={() => this.visualizeBreadthFirstSearch()}>
                Visualize Breadth First Search Algorithm
            </button>
            <div className="grid">
                {grid.map((row, rowIdx) => {
                    return (
                        <div key={rowIdx}>
                            {row.map((node, nodeIdx) => {
                                const {row, col, isFinish, isStart, isWall} = node;
                                return (
                                    <Node
                                        key={nodeIdx}
                                        col={col}
                                        isFinish={isFinish}
                                        isStart={isStart}
                                        isWall={isWall}
                                        mouseIsPressed={mouseIsPressed}
                                        onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                        onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                        onMouseUp={() => this.handleMouseUp()}
                                        row={row}>
                                    </Node>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
            </>
        );
    }
}
//External functions that do stuff with individual nodes?
//Get the initial conditions of the grid
const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(col, row));
        }
        grid.push(currentRow);
    }
    return grid;
};

//Builds a node
const createNode = (col, row) => {
    return {
        col,
        row,
        isStart: row === START_ROW && col === START_COL,
        isFinish: row === FINISH_ROW && col === FINISH_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null,
    };
};

//Get the current grid including the walls
const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
};
