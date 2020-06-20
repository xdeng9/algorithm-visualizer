import React from 'react';
import './queen.css';

class Queen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            row: 8,
            col: 8
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.getElementById('queen').classList.add('active');
        document.getElementById('maze').classList.remove('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
    }

    createChessBoard() {
        let board = [];
        let { row, col } = this.state;
        for (let i = 0; i < row; i++) {
            let rowArray = [];
            for (let j = 0; j < col; j++) {
                let cellNum = i * row + j;
                rowArray.push(
                    <div>

                    </div>
                )
            }
            board.push(rowArray);
        }
        return board;
    }

    handleClick(e) {
        e.preventDefault();
    }
    
    render() {
        return (
            <div className="board-container">
                <div className="nqueens-controll">
                    <label>
                        N=
                    <input className="input-field" value={this.state.col}></input>
                    </label>
                    <button className="nqueens-btn" onClick={this.handleClick}>Start</button>
                </div>
            </div>
        )
    }
}

export default Queen;