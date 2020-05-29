import React from 'react';
import './grid.css';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.rows = 25;
    this.cols = 50;
    this.startSelected = false;
    this.endSelected = false;
    this.state = {
      grid: [],
      start: [10, 8],
      end: [10, 42],
      isMousePressed: false,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentDidMount() {
    this.setState({ grid: this.createGrid() });
  }

  createGrid() {
    let grid = [];
    let style = "cell";
    let { start, end } = this.state;
    for (let i = 0; i < this.rows; i++) {
      grid.push([]);
      for (let j = 0; j < this.cols; j++) {
        if (i === start[0] && j === start[1]) style = "cell start";
        else if (i === end[0] && j === end[1]) style = "cell finish";
        else style = "cell";
        grid[i][j] = (
          <div
            id={`${i}-${j}`}
            key={`${i}-${j}`}
            className={style}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseEnter={this.handleMouseEnter.bind(this, i, j)}
            onMouseLeave={this.handleMouseLeave.bind(this, i, j)}
          ></div>
        );
      }
    }
    return grid;
  }

  handleMouseDown(e) {
    let pos = e.currentTarget.id.split("-");
    if (
      parseInt(pos[0]) === this.state.start[0] &&
      parseInt(pos[1]) === this.state.start[1]
    ) {
      this.startSelected = true;
    } else {
      this.startSelected = false;
    }

    if (
      parseInt(pos[0]) === this.state.end[0] &&
      parseInt(pos[1]) === this.state.end[1]
    ) {
      this.endSelected = true;
    } else {
      this.endSelected = false;
    }

    this.setState({ isMousePressed: true });
  }

  handleMouseEnter(i, j) {
    if (!this.state.isMousePressed) return;
    let cell = document.getElementById(`${i}-${j}`);
    if (!this.startSelected && !this.endSelected) {
        
    } else {
        if (this.startSelected)
            cell.classList.add('start');
        else cell.classList.add("finish");
    }
  }

  handleMouseLeave(i, j) {
    if (!this.state.isMousePressed) return;

    let cell = document.getElementById(`${i}-${j}`);
    if (!this.startSelected && !this.endSelected) {
        if (cell.id !== this.getStartElement().id && cell.id !== this.getEndElement().id) {
            if (cell.classList.contains("wall")) cell.classList.remove("wall");
            else cell.classList.add("wall");
        }
    } else {
      if (this.startSelected) 
        document.getElementById(`${i}-${j}`).classList.remove("start");
      else document.getElementById(`${i}-${j}`).classList.remove("finish");
    }
  }

  handleMouseUp(e) {
    let pos = this.parseIdToPos(e.currentTarget.id);
    if (this.startSelected) {
      document.getElementById(e.currentTarget.id).classList.add("start");
      if (pos[0] !== this.state.start[0] && pos[1] !== this.state.start[1])
        this.getStartElement().classList.remove("start");
      this.setState({
        isMousePressed: false,
        start: this.parseIdToPos(e.currentTarget.id),
      });
    } else if (this.endSelected) {
      document.getElementById(e.currentTarget.id).classList.add("finish");
      if (pos[0] !== this.state.end[0] && pos[1] !== this.state.end[1])
        this.getEndElement().classList.remove("finish");
      this.setState({
        isMousePressed: false,
        end: this.parseIdToPos(e.currentTarget.id),
      });
    } else {
        let cell = document.getElementById(e.currentTarget.id);
        if (cell.classList.contains("wall")) cell.classList.remove("wall");
        else cell.classList.add("wall");
        this.setState({ isMousePressed: false });
    }
  }

  parseIdToPos(id) {
    let pos = id.split("-");
    return pos.map((el) => parseInt(el));
  }

  getStartElement() {
    return document.getElementById(
      `${this.state.start[0]}-${this.state.start[1]}`
    );
  }

  getEndElement() {
    return document.getElementById(
      `${this.state.end[0]}-${this.state.end[1]}`
    );
  }

  animate() {
    let { grid, start, end } = this.state;
    if (this.props.algoType === "dijkstra") {
        let { time, shortestPath } = this.props.dijkstraSearch(
          start,
          end,
          grid.length,
          grid[0].length
        );

        setTimeout(() => {
            for (let i = 0; i < shortestPath.length; i++) {
                 console.log('hello');
                document.getElementById(shortestPath[i]).classList.add('path');
            }
        }, time)
    }
  }

  handleReset(e) {
      e.preventDefault();
      this.getStartElement().classList.remove('start');
      this.getEndElement().classList.remove('finish');
      this.setState({
          start: [10, 8],
          end: [10, 42]
      }, () => {
          this.getStartElement().classList.add("start");
          this.getEndElement().classList.add("finish");
      })
      for (let i = 0; i < this.state.grid.length; i++) {
        for (let j = 0; j < this.state.grid[0].length; j++) {
            document.getElementById(`${i}-${j}`).classList.remove("visit");
            document.getElementById(`${i}-${j}`).classList.remove("wall");
            document.getElementById(`${i}-${j}`).classList.remove("path");
        }
      }
  }

  render() {

    return (
      <div className="grid-content">
        <div className="controlls">
          <button className="start-btn hover" onClick={() => this.animate()}>
            Start
          </button>
          <button className="reset-btn hover" onClick={this.handleReset}>
            Reset
          </button>
        </div>
        <div className="gcp">
          <div className="grid-container">{this.state.grid}</div>
        </div>
      </div>
    );
  }
}

export default Grid;