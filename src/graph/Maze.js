import React from 'react';
import './maze.css';

class Maze extends React.Component {

    constructor(props) {
        super(props);
        this.rows = 30;
        this.cols = 60;

        this.handleMaze = this.handleMaze.bind(this);
        this.handlePath = this.handlePath.bind(this);
    }

    componentDidMount() {
        document.getElementById('maze').classList.add('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
    }

    posToId(pos) {
        return `${pos[0]}-${pos[1]}`;
    }

    idToPos(id) {
        let parts = id.split('-');
        return [parseInt(parts[0]), parseInt(parts[1])];
    }

    getNeighbors(pos, visited) {
        const dirs = [
            [-1, 0],
            [0, 1],
            [1, 0],
            [0, -1],
        ]

        let [x, y] = pos;
        let nodes = [];

        for (let dir of dirs) {
            let [dx, dy] = dir;
            let newX = dx + x;
            let newY = dy + y;
            let newPos = [newX, newY];
            if (newX >= 0 && newX < this.rows && newY >= 0 && newY < this.cols) {
                if (!visited.has(this.posToId(newPos))) {
                    nodes.push(newPos);
                }
            }
        }
        return nodes;
    }

    primesAlgo() {
        let start = [0, 0];
        let visited = new Set();
        let walls = new Set();
        let frontier = [[0, 1], [1, 0]];
        visited.add(this.posToId(start));
        document.getElementById(this.posToId(start)).classList.add('hollow');
        for (let node of frontier) {
            walls.add(this.posToId(node));
        }
        let offset = 1;

        while (frontier.length !== 0) {
            let randIndex = Math.floor(Math.random() * frontier.length);
            let curPos = frontier[randIndex];
            let posId = this.posToId(curPos);
            frontier.splice(randIndex, 1);
            visited.add(posId);

            // setTimeout(() => {
            this.markPos(curPos, visited);
            // }, 20 * offset)
            offset++;
            debugger
            let neighbors = this.getNeighbors(curPos, visited);
            for (let neighbor of neighbors) {
                if (!walls.has(this.posToId(neighbor))) {
                    walls.add(this.posToId(neighbor));
                    frontier.push(neighbor);
                }
            }
        }
    }

    markPos(pos, visited) {
        let posId = this.posToId(pos)

        let up = [pos[0] - 1, pos[1]];
        let down = [pos[0] + 1, pos[1]];
        let left = [pos[0], pos[1] - 1];
        let right = [pos[0], pos[1] + 1];

        if (visited.has(this.posToId(up))) {
            document.getElementById(posId).classList.remove('solid');
            document.getElementById(posId).classList.add('hollow');
            document.getElementById(posId).classList.add('top-pass');
            document.getElementById(this.posToId(up)).classList.add('bottom-pass');
        } else if (visited.has(this.posToId(down))) {
            document.getElementById(posId).classList.remove('solid');
            document.getElementById(posId).classList.add('hollow');
            document.getElementById(posId).classList.add('bottom-pass');
            document.getElementById(this.posToId(down)).classList.add('top-pass');
        } else if (visited.has(this.posToId(left))) {
            document.getElementById(posId).classList.remove('solid');
            document.getElementById(posId).classList.add('hollow');
            document.getElementById(posId).classList.add('left-pass');
            document.getElementById(this.posToId(left)).classList.add('right-pass');
        } else if (visited.has(this.posToId(right))) {
            document.getElementById(posId).classList.remove('solid');
            document.getElementById(posId).classList.add('hollow');
            document.getElementById(posId).classList.add('right-pass');
            document.getElementById(this.posToId(right)).classList.add('left-pass');
        }
    }

    handleMaze(e) {
        e.preventDefault();
        this.primesAlgo();
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
                    >
                    </div>
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