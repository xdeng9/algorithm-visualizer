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
                        id={id.toString()}
                        className={`chess-cell ${cellStyle}`}
                        style={{ width: size, height: size }}>
                    </div>
                )
            }
            board.push(rowArray);
        }
        return board;
    }

    getCellId(row, col) {
        return (row * this.state.row + col).toString();
    }

    solveNQueens(res, row, moves = []) {
        let len = res.length;
        if (row === len) {
            console.log(res)
            return true;
        }

        let availablePos = [];
        for (let i = 0; i < this.state.row; i++) {
            availablePos[i] = true;
        }
        
        let offset = 0;
        let idx = 0;
        for (let n of res) {
            if (n === -1) break;
            availablePos[n] = false;
            offset = row - idx;
            if (n + offset < len) availablePos[n + offset] = false;
            if (n - offset >= 0) availablePos[n - offset] = false;
            idx++;
        }
    
        if (availablePos.every(ele => ele === false)) return;
        for (let i = 0; i < availablePos.length; i++) {
            if (!availablePos[i]) continue;
            let cellNum = row * this.state.row + i;
            res[row] = i;
            document.getElementById(this.getCellId(row, i)).classList.add('queen');
            if (this.solveNQueens(res, row + 1)) return true;
            res[row] = -1;
            document.getElementById(this.getCellId(row, i)).classList.remove('queen');
        }
    }

    handleClick(e) {
        e.preventDefault();
        // document.querySelector('.menu-list').classList.add('disable');
        this.reset()
        let res = new Array(this.state.row);
        res.fill(-1);
        this.solveNQueens(res, 0);
    }

    handleUpdate(e) {
       this.reset();
       let val = parseInt(e.currentTarget.value);
        this.setState({
            row: val,
            col: val
        })
    }

    reset() {
        for (let i = 0; i < this.state.row; i++) {
            for (let j = 0; j < this.state.col; j++) {
                document.getElementById(this.getCellId(i, j)).classList.remove('queen');
            }
        }
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