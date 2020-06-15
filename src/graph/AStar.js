import React from 'react';
import Grid from "../grid/grid";
import "./graph.css";
import { Node, calcGCost, calcHCost, found } from './aStar_util';
import { PriorityQueue, getAdjNodes } from './util';

class AStar extends React.Component {

  componentDidMount() {
    document.getElementById("astar").classList.add("active");
    document.getElementById("dijkstra").classList.remove("active");
    document.getElementById("maze").classList.remove("active");
    document.getElementById('queen').classList.remove('active');
  }

  aStarSearch(start, end, row, col) {
    let pq = new PriorityQueue();
    let open = {};
    let close = new Set();
    let curPos = start;
    let g = 0;
    let h = calcHCost(start, end);
    let offset = 1;
    let path = [];
    let startNode = new Node(start, g, h);
    let startKey = `${start[0]-start[1]}`;
    pq.add(startNode);
    open[startKey] = startNode;

    while (pq.size !== 0) {
      let curNode = pq.remove();
      curPos = curNode.getPos();
      let key = `${curPos[0]}-${curPos[1]}`;
      close.add(key);

      setTimeout(() => {
        document.getElementById(`${key}`).classList.add("visit");
      }, offset);
      offset++;

      if (found(curPos, end)) {
        let prev = curNode;
        while (prev.parent !== null) {
          path.unshift(prev.getPos());
          prev = prev.parent;
        }
        path.unshift(start);
        path.push(offset);
        return path;
      }
  
      let neighbors = getAdjNodes(curPos, row, col);
      for (let neighbor of neighbors) {
        let k = `${neighbor[0]}-${neighbor[1]}`;
        if (close.has(k)) continue;

        g = calcGCost(start, neighbor);
        h = calcHCost(neighbor, end);
        let node = new Node(neighbor, g, h);
        if (open[k] === undefined) pq.add(node);
        open[k] = node;
        node.setParent(curNode);
        
        open[key] = node;
        
      }
    }
    return [];
  }

    render() {
        return (
          <div className="graph-box">
            <Grid algoType="aStar" aStarSearch={this.aStarSearch}/>
          </div>
        );
    }
}

export default AStar;