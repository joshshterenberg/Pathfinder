// Performs Breadth First Search Algorithm
// Uses a FIFO queue:
//      Starts with nothing in queue, step 1: dequeue, step 2: requeue
// With pathfinding, we have 4 options, so...
// q = ''
// loop:
//      get the first element from the queue (store in x), remove it from queue
//      for each "u", "l", ...
//          add x + element to the queue, but only if they are valid moves
//          check if any path just added reaches the end, if it does stop

// Main method to implement algorithm: RETURNS ARRAY OF THE VISITED NODES IN THE ORDER WE VISITED THEM
export function breadthFirstSearch(grid, startNode, finishNode) {

    //Create a list of the visited nodes in order, and a list of unvisited nodes so far.
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);

    //Add is going to be a single node (start: startNode) to add in relationship to the startNode, based on the UDLR
    const nextBasisNode = startNode;
    const n = 0;

    //While add is not the end node or there are no more unvisied nodes,
    while (nextBasisNode !== finishNode) {
        visitedNodesInOrder[n] = nextBasisNode;
        const fourNodes = [];
        if (nextBasisNode.row > 0) {
            fourNodes.push(document.getElementById(`node-${nextBasisNode.row-1}-${node.col}`));
        }
        if (nextBasisNode.row < 19) {
            fourNodes.push(document.getElementById(`node-${nextBasisNode.row+1}-${node.col}`));
        }
        if (nextBasisNode.col > 0) {
            fourNodes.push(document.getElementById(`node-${nextBasisNode.row}-${node.col-1}`));
        }
        if (nextBasisNode.row < 49) {
            fourNodes.push(document.getElementById(`node-${nextBasisNode.row}-${node.col+1}`));
        }

        //If there are no more possible generations, we must be trapped and should stop.
        if (fourNodes.length === 0) {
            return visitedNodesInOrder;
        }

        for each (j in fourNodes) {
            if valid(grid, j) {
                visitedNodesInOrder.push(j);
            }
        }
    }
    //       add is going to be the next element of the visitednodes, traversing the list linearly as it is being built
    //       you are going to generate 4 new nodes, the UDLR, and check their validity (w.r.t. walls, border, visited nodes)
    //       If valid,
    //              add the node to the visitedNodesInOrder and remove from unvisitedNodes.
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
