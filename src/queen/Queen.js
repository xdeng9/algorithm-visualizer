import React from 'react';
import './queen.css';

class Queen extends React.Component {

    constructor(props) {
        super(props);
        this.dimension = 600;
        this.state = {
            row: 8,
            col: 8
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
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
        const size = Math.floor(this.dimension / row - 1) + 'px';
        let lsg = false;
        let cellStyle = '';
        for (let i = 0; i < row; i++) {
            let rowArray = [];
            if (this.state.row % 2 === 0) lsg = !lsg
            for (let j = 0; j < col; j++) {
                if (lsg) cellStyle = 'cell-i';
                else cellStyle = 'cell-j';
                lsg = !lsg;
                let id = i * row + j;
                rowArray.push(
                    <div
                        key={id}
                        id={id}
                        className={`chess-cell ${cellStyle}`}
                        style={{ width: size, height: size }}>
                    </div>
                )
            }
            board.push(rowArray);
        }
        return board;
    }

    handleClick(e) {
        e.preventDefault();
        // document.querySelector('.menu-list').classList.add('disable');

    }

    handleUpdate(e) {
       let val = e.currentTarget.value;
        this.setState({
            row: val,
            col: val
        })
    }
    
    render() {
        return (
            <div className="board-container">
                <div className="nqueens-controll">
                    <label>
                        N=
                    <input 
                        className="input-field" 
                        onChange={this.handleUpdate} 
                        value={this.state.col}
                        type="number"
                        min="4"
                        max="23">
                    </input>
                    </label>
                    <button className="nqueens-btn" onClick={this.handleClick}>Start</button>
                </div>
                <div className="chess-board">
                    {this.createChessBoard()}
                </div>
            </div>
        )
    }
}

export default Queen;