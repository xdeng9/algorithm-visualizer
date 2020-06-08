import React from 'react';
import './maze.css';

class Maze extends React.Component {

    constructor(props) {
        super(props);
        this.rows = 35;
        this.cols = 65;
        this.state = {
            controllDsiabled: false
        }

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
        this.markPos([0, 0]);
        let frontier = [[0, 1], [1, 0]];
        let offset = 1;
        visited.add(this.posToId(start));
   
        for (let node of frontier) {
            walls.add(this.posToId(node));
        }

        while (frontier.length !== 0) {
            let randIndex = Math.floor(Math.random() * frontier.length);
            let curPos = frontier[randIndex];
            frontier.splice(randIndex, 1);

            if (!this.canBePlaced(curPos, visited)) continue;

            let newPos = this.getNewPos(curPos, visited);
            visited.add(this.posToId(curPos));
            visited.add(this.posToId(newPos));

            setTimeout(() => {
                this.markPos(curPos);
                this.markPos(newPos);
            }, 20 * offset)
            offset++;
  
            let neighbors = this.getNeighbors(newPos, visited);
            for (let neighbor of neighbors) {
                if (!walls.has(this.posToId(neighbor))) {
                    walls.add(this.posToId(neighbor));
                    frontier.push(neighbor);
                }
            }
        }
        return offset * 20;
    }

    canBePlaced(pos, visited) {
        let up = [pos[0] - 1, pos[1]];
        let down = [pos[0] + 1, pos[1]];
        let left = [pos[0], pos[1] - 1];
        let right = [pos[0], pos[1] + 1];

        let count = 0;
        if (visited.has(this.posToId(up))) count++;
        if (visited.has(this.posToId(down))) count++;
        if (visited.has(this.posToId(left))) count++;
        if (visited.has(this.posToId(right))) count++;

        return count < 2;
    }

    markPos(pos) {
        let posId = this.posToId(pos)
        document.getElementById(posId).classList.add('hollow');
    }

    getNewPos(pos, visited) {

        let up = [pos[0] - 1, pos[1]];
        let down = [pos[0] + 1, pos[1]];
        let left = [pos[0], pos[1] - 1];
        let right = [pos[0], pos[1] + 1];

        if (visited.has(this.posToId(up))) {
            return down;
        } else if (visited.has(this.posToId(down))) {
            return up;
        } else if (visited.has(this.posToId(left))) {
            return right;
        } else if (visited.has(this.posToId(right))) {
            return left;
        }
    }

    resetMaze() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                document.getElementById(`${i}-${j}`).classList.remove('hollow');
            }
        }
    }

    solveMaze(start = [0, 0], end = [this.rows - 1, this.cols - 1]) {
        
    }

    handleMaze(e) {
        e.preventDefault();
        this.resetMaze();
        let duration = this.primesAlgo();
        this.setState({ controllDsiabled: true })
        setTimeout(() => {
            this.setState({ controllDsiabled: false })
        }, duration);
    }

    handlePath(e) {
        e.preventDefault();
        let start = document.getElementById(this.posToId([0, 0]));
        if (!start || !start.classList.contains('hollow')) return;
        this.solveMaze();
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
                        className="wall"
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
                    <button
                        disabled={this.state.controllDsiabled}
                        onClick={this.handleMaze}>
                        Create Maze
                    </button>
                    <button 
                        disabled={this.state.controllDsiabled}
                        onClick={this.handlePath} 
                        className="show-path-btn">
                            Show Path
                        </button>
                </div>
                <div className="maze-grid">
                    {this.createGrid()}
                </div>
            </div>
        )
    }
}

export default Maze;