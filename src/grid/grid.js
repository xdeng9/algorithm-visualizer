import React from 'react';
import './grid.css';

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.rows = 25;
    this.cols = 50;
    this.startSelected = false;
    this.endSelected = false;
    this.lastPos = [0, 0];
    this.state = {
      grid: [],
      start: [10, 8],
      end: [10, 42],
      isMousePressed: false,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleOutbounds = this.handleOutbounds.bind(this);
    this.handleTips = this.handleTips.bind(this);

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
    e.preventDefault();

    let pos = e.currentTarget.id.split("-");
    if (
      parseInt(pos[0]) === this.state.start[0] &&
      parseInt(pos[1]) === this.state.start[1]
    ) {
      this.lastPos = this.parseIdToPos(e.currentTarget.id);
      this.startSelected = true;
    } else {
      this.startSelected = false;
    }

    if (
      parseInt(pos[0]) === this.state.end[0] &&
      parseInt(pos[1]) === this.state.end[1]
    ) {
      this.lastPos = this.parseIdToPos(e.currentTarget.id);
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
      if (!this.isStartOrEnd([i, j])) {
        this.lastPos = [i, j];
        if (this.startSelected)
          cell.classList.add('start');
        else cell.classList.add("finish");
      }
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
      if (this.startSelected) {
        document.getElementById(`${i}-${j}`).classList.remove("start");
      }
      else {
        document.getElementById(`${i}-${j}`).classList.remove("finish");
      } 
      this.lastPos = [i, j];
    }
  }

  handleMouseUp(e) {
    e.preventDefault();
    let pos = this.parseIdToPos(e.currentTarget.id);

    if (!this.isStartOrEnd(pos)) {
      if (this.startSelected) {
        document.getElementById(e.currentTarget.id).classList.add("start");
        this.setState({
          isMousePressed: false,
          start: this.parseIdToPos(e.currentTarget.id),
        });
      } else if (this.endSelected) {
        document.getElementById(e.currentTarget.id).classList.add("finish");
        this.setState({
          isMousePressed: false,
          end: this.parseIdToPos(e.currentTarget.id),
        });
      } else {
        let cell = document.getElementById(e.currentTarget.id);
        if (cell.classList.contains("wall")) cell.classList.remove("wall");
        else if (!this.isStartOrEnd(pos)) {
          cell.classList.add("wall");
        }
        this.setState({ isMousePressed: false });
      }
    } else {
      if (this.startSelected) {
        document.getElementById(this.parsePosToId(this.lastPos)).classList.add('start');
        this.setState({
          isMousePressed: false,
          start: this.lastPos
        });
      } else if (this.endSelected) {
        document.getElementById(this.parsePosToId(this.lastPos)).classList.add('finish');
        this.setState({
          isMousePressed: false,
          end: this.lastPos
        });
      }
    }
  }

  isStartOrEnd(pos) {
    if (pos[0] === this.state.start[0] && pos[1] === this.state.start[1]) return true;
    if (pos[0] === this.state.end[0] && pos[1] === this.state.end[1]) return true;
    return false;
  }

  parseIdToPos(id) {
    let pos = id.split("-");
    return pos.map((el) => parseInt(el));
  }

  parsePosToId(pos) {
    return `${pos[0]}-${pos[1]}`;
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

  disableEvents() {
    document.querySelector('.grid-content').classList.add('disable');
    document.querySelector('.menu-list').classList.add('disable');
    document.querySelector('.title').classList.add('disable');
  }

  enableEvents() {
    document.querySelector('.grid-content').classList.remove('disable');
    document.querySelector('.menu-list').classList.remove('disable');
    document.querySelector('.title').classList.remove('disable');
  }

  animate() {
    this.disableEvents();
    this.clearGraph();
    let { grid, start, end } = this.state;

    if (this.props.algoType === "dijkstra") {
        let res = this.props.dijkstraSearch(
          start,
          end,
          grid.length,
          grid[0].length
        );
        
        if (res === null) {
          alert('No path found');
          this.enableEvents();
        } else {
          let { time, shortestPath } = res;
          setTimeout(() => {
            for (let i = 0; i < shortestPath.length; i++) {
              document.getElementById(shortestPath[i]).classList.add('path');
            }
            this.enableEvents();
          }, time)
        }
    } else if (this.props.algoType === "aStar") {
      let path = this.props.aStarSearch(
        start,
        end,
        grid.length,
        grid[0].length)

        if (path.length === 0) {
          alert('No path found');
          this.enableEvents();
        } else {
          let time = path.pop();
          setTimeout(() => {
            for (let i = 0; i < path.length; i++) {
              document.getElementById(this.parsePosToId(path[i])).classList.add('path');
            }
            this.enableEvents();
          }, time + 1000);
        }
    }
  }

  clearGraph() {
    for (let i = 0; i < this.state.grid.length; i++) {
      for (let j = 0; j < this.state.grid[0].length; j++) {
        document.getElementById(`${i}-${j}`).classList.remove("visit");
        document.getElementById(`${i}-${j}`).classList.remove("path");
      }
    }
  }

  handleReset(e) {
    e.preventDefault();
    for (let i = 0; i < this.state.grid.length; i++) {
      for (let j = 0; j < this.state.grid[0].length; j++) {
        document.getElementById(`${i}-${j}`).classList.remove("visit");
        document.getElementById(`${i}-${j}`).classList.remove("wall");
        document.getElementById(`${i}-${j}`).classList.remove("path");
        document.getElementById(`${i}-${j}`).classList.remove("start");
        document.getElementById(`${i}-${j}`).classList.remove("finish");
      }
    }

      this.setState({
          start: [10, 8],
          end: [10, 42]
      }, () => {
          this.getStartElement().classList.add("start");
          this.getEndElement().classList.add("finish");
      })
  }

  handleOutbounds(e) {
    e.preventDefault();
    if (!this.state.isMousePressed) return;

    if (this.startSelected) {
      document.getElementById(this.parsePosToId(this.lastPos)).classList.add('start');
      this.startSelected = false;
      this.setState({ isMousePressed: false, start: this.lastPos });
    } else if (this.endSelected) {
      document.getElementById(this.parsePosToId(this.lastPos)).classList.add('finish');
      this.endSelected = false;
      this.setState({ isMousePressed: false, end: this.lastPos });
    }
  }

  handleTips() {
    let tipsModal = document.querySelector('.tips');
    let closeBtn = document.getElementById('close-btn');
    tipsModal.style.display = 'block';

    closeBtn.onclick = () => {
      tipsModal.style.display = 'none';
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
          <button className="tips-btn hover" onClick={this.handleTips}>
            Tips
          </button>
        </div>
        <div className="tips" id="tips">
          <button className="close-btn hover" id="close-btn">
            X
          </button>
          <div className="pointers">
            <p>Drag star to change the starting vertex. </p>
            <p>Drag flag to change the ending vertex. </p>
            <p>Press down on empty spaces to creat walls.</p>
          </div>
          <div className="tips-content"></div>
        </div>
        <div className="gcp">
          <div className="grid-container" onMouseLeave={this.handleOutbounds}>
            {this.state.grid}
          </div>
        </div>
      </div>
    );
  }
}

export default Grid;