import React from 'react';
import Grid from "../grid/grid";
import "./graph.css";

class AStar extends React.Component {

  componentDidMount() {
    document.getElementById("dijkstra").classList.remove("active");
    document.getElementById("astar").classList.add("active");
  }

    render() {
        return (
          <div className="graph-box">
            <Grid algoType="aStar" />
          </div>
        );
    }
}

export default AStar;