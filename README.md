# Algorithm Visualizer

Algorithm Visualizer is a tool for visualizing different algorithms. This app is built using JavaScript and React.

Currently supports:
- Dijkstra's Algorithm - an algorithm for finding the shortest path. I implemented it using a Priority Queue.


More features coming:
- A* Algorithm - a more optimal path finding algorithms. Faster than Dijkstra's.
- N Queen's - a puzzle for placing N queens on a N x N board.
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

  }

```
