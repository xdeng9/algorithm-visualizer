# Algorithm Visualizer
[Try it out here](https://joedeng.me/algorithm-visualizer/#/)

Algorithm Visualizer is a tool for visualizing different algorithms (see demos below). This app is built using JavaScript and React.

## Currently supports:
- Dijkstra's Algorithm - an algorithm for finding the shortest path. Implemented it with a binary min-heap priority queue.
- A* Algorithm - a more optimal path finding algorithm. Faster than Dijkstra's.
- Maze - used Prim's algorithm to randomly generate a maze. Used A* algorithm for solving it.

## Upcoming algorithms:
- N Queen's - a puzzle for placing N queens on a N x N board. Can be solved using backtracking.
- Merge Sort - a sorting algorithm that uses the divide and conquer approach.
- Quick Sort - another divide and conquer sorting algorithm.

<img src="https://github.com/xdeng9/algorithm-visualizer/blob/master/screen/demo0.gif" />
<img src="https://github.com/xdeng9/algorithm-visualizer/blob/master/screen/demo2.gif" />

``` Javascript
 dijkstraSearch(start, end, rows, cols) {
 
     ...
     
    let graph = buildAdjList(rows, cols);
    let pq = new PriorityQueue();
    distance[src] = 0;
    pq.add(new Node(src, 0));
 
    while (!visited.has(tar)) {

        let curNode = pq.remove();
        if (visited.has(curNode.k)) {
            continue;
        }
        visited.add(curNode.k);
        
        ...

        let neighbors = graph[curNode.k];
        for (let neighbor in neighbors) {

            let newDistance = neighbors[neighbor] + distance[curNode.k];

            if (newDistance < distance[neighbor]) {
                distance[neighbor] = newDistance;
                path[neighbor] = curNode;
            }
            pq.add(new Node(neighbor, distance[neighbor]));
        }
    }
      ...
  }

```

```JavaScript
PriorityQueue.prototype.heapifyUp = function () {
    let index = this.size - 1;
    while (this.hasParent(index) && this.parent(index).d > this.items[index].d) {
        this.swap(index, this.getParentIndex(index));
        index = this.getParentIndex(index);
    }
}

PriorityQueue.prototype.heapifyDown = function() {
    let index = 0;
    while (this.hasLeftChild(index)) {
        let smallerChildIndex = this.getLeftChildIndex(index);
        if (this.hasRightChild(index) && this.rightChild(index).d < this.leftChild(index).d) {
            smallerChildIndex = this.getRightChildIndex(index);
        }

        if (this.items[index] < this.items[smallerChildIndex]) break;
        this.swap(index, smallerChildIndex);
        index = smallerChildIndex;
    }
}
```
