// Performs Breadth First Search Algorithm

// Main method to implement algorithm: RETURNS ARRAY OF THE VISITED NODES IN THE ORDER WE VISITED THEM
export function breadthFirstSearch(grid, startNode, finishNode) {

    //Create a list of the visited nodes in order, and a list of unvisited nodes so far.
    const visitedNodesInOrder = [startNode];
    const unvisitedNodes = getAllNodes(grid);

    //Add is going to be a single node (start: startNode) to add in relationship to the startNode, based on the UDLR
    let nextBasisNode = startNode;
    let n = 0;

    //While [add is not the end node and] there are more unvisited nodes, [we check the end node in the loop and break then]
    while (!!unvisitedNodes) {
        //Visit a node
        nextBasisNode = visitedNodesInOrder[n];
        unvisitedNodes.pop(nextBasisNode);
        let unvisitedNeighbors = updateUnvisitedNeighbors(nextBasisNode, grid);

        //If there are no more possible neighbors, we must be trapped and should stop. Or if we hit the end.
        if (unvisitedNeighbors.length === 0 || nextBasisNode === finishNode) {
            return visitedNodesInOrder;
        }
        //Otherwise, we visit each neighbor and remove them from unvisited.
        for (const i of unvisitedNeighbors) {
            i.isVisited = true;
            visitedNodesInOrder.push(i);
            unvisitedNodes.pop(i);
        }
        n++;
    }
    //       add is going to be the next element of the visitednodes, traversing the list linearly as it is being built
    //       you are going to generate 4 new nodes, the UDLR, and check their validity (w.r.t. walls, border, visited nodes)
    //       If valid,
    //              add the node to the visitedNodesInOrder and remove from unvisitedNodes.
}
function updateUnvisitedNeighbors(node, grid) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.previousNode = node;
    }
    return unvisitedNeighbors;
}
function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
}
function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}
export function getNodesInShortestPath(finishNode) {
    return true;
}
