import React from 'react';
import Grid from '../grid/grid';
import './graph.css'
import { buildAdjList, getSP, PriorityQueue, Node } from "./util";

class Dijkstra extends React.Component {

    componentDidMount() {
        document.getElementById('dijkstra').classList.add('active');
        document.getElementById("astar").classList.remove("active");
    }

  dijkstraSearch(start, end, rows, cols) {
    let graph = buildAdjList(rows, cols);
    let visited = new Set();
    let src = `${start[0]}-${start[1]}`;
    let tar = `${end[0]}-${end[1]}`;
    let distance = {};
    let path = {};
    let pq = new PriorityQueue();
    let offset = 1;
    let time = 0;

    for (let node in graph) {
        distance[node] = Infinity;
    }

    distance[src] = 0;
    pq.add(new Node(src, 0));
 
    while (!visited.has(tar)) {
        if (pq.size === 0) {
          console.log('trapped!')
          return null;
        }
        let curNode = pq.remove();
        if (visited.has(curNode.k)) {
            continue;
        }
        visited.add(curNode.k);

        setTimeout(() => {
            document.getElementById(`${curNode.k}`).classList.add("visit");
        }, 10 * offset);
        offset++;

        let neighbors = graph[curNode.k];
        for (let neighbor in neighbors) {

            let newDistance = neighbors[neighbor] + distance[curNode.k];

            if (newDistance < distance[neighbor]) {
                distance[neighbor] = newDistance;
                path[neighbor] = curNode;
            }
            if (!visited.has(neighbor)) {
              pq.add(new Node(neighbor, distance[neighbor]));
            }
        }
    }
        time = offset * 10 + 1500;
        let shortestPath = getSP(path, src, tar); 
        return { time, shortestPath };
  }

  render() {
    return (
      <div className="graph-box">
        <Grid algoType="dijkstra" dijkstraSearch={this.dijkstraSearch}/>
      </div>
    );
  }
}

export default Dijkstra;