import React from 'react';
import './queen.css';

class Queen extends React.Component {

    constructor(props) {
        super(props);
        this.row = 8;
        this.col = 8;
    }

    componentDidMount() {
        document.getElementById('queen').classList.add('active');
        document.getElementById('maze').classList.remove('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
    }

    createChessBoard() {
        let board = [];
        for (let i = 0; i < this.row; i++) {
            let row = [];
            for (let j = 0; j < this.col; j++) {
                let cellNum = i * this.row + j;
                row.push(
                    <div>

                    </div>
                )
            }
            board.push(row);
        }
        return board;
    }
    
    render() {
        return (
            <div className="board-container">
                <div className="nqueens-controll">
                    <label>
                        N=
                    <input className="input-field"></input>
                    </label>
                    <button>Start</button>
                </div>
            </div>
        )
    }
}

export default Queen;