//Main algorithm: returns every visited node in the order they were visited.
export function breadthFirstSearch(grid, startNode, finishNode) {
    const visitedNodesInOrder = [startNode];
    let n = 0;
    let closestNode = startNode;
    while(n < visitedNodesInOrder.length) {
        closestNode = visitedNodesInOrder[n];
        //if the closestNode is the finishNode, we're done
        if (closestNode === finishNode) return visitedNodesInOrder;
        //otherwise, we must be trapped
        //getValidNeighbors will find all valid neighbors to currentNode and connect them
        closestNode.isVisited = true;
        const validNeighbors = getValidNeighbors(grid, closestNode);
        for (const i of validNeighbors) {
            closestNode.previousNode = validNeighbors[i];
            visitedNodesInOrder.push(validNeighbors[i]);
        }
        n++;
    }
    return visitedNodesInOrder;
}
function getValidNeighbors(grid, closestNode) {
    const neighbors = [];
    const {col, row} = closestNode;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}
//Gets the path. Only works after breadthFirstSearch is called
export function getNodesInShortestPath(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}
