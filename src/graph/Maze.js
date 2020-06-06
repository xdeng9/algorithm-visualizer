import React from 'react';
import './maze.css';

class Maze extends React.Component {

    constructor(props) {
        super(props);
        this.rows = 35;
        this.cols = 60;

        this.handleMaze = this.handleMaze.bind(this);
        this.handlePath = this.handlePath.bind(this);
    }

    componentDidMount() {
        document.getElementById('maze').classList.add('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
    }

    handleMaze(e) {
        e.preventDefault();
        document.getElementById('10-10').classList.add('hollow');
    }

    handlePath(e) {
        e.preventDefault();
    }

    createGrid() {
        let grid = [];
        for (let i = 0; i < this.rows; i++) {
            grid.push([]);
            for (let j = 0; j < this.cols; j++) {
                grid[i][j] = (
                    <div
                        id={`${i}-${j}`}
                        key={`${i}-${j}`}
                        className="solid"
                    ></div>
                );
            }
        }
        return grid;
    }

    render() {
        return (
            <div className="maze-container">
                <div className="maze-controll">
                    <button onClick={this.handleMaze}>Create Maze</button>
                    <button onClick={this.handlePath} className="show-path-btn">Show Path</button>
                </div>
                <div className="maze-grid">
                    {this.createGrid()}
                </div>
            </div>
        )
    }
}

export default Maze;