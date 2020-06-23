import React from 'react';
import './bars.css';

class Bars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            min: 5,
            max: 600,
            size: 300
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(e) {
        e.preventDefault();
    }

    componentDidMount() {
        this.populateArray();
    }

    populateArray(size = this.state.size) {
        let unsorted = [];
        let randNum = 23;
        for (let i = 0; i < size; i++) {
            randNum = Math.floor(Math.random() * (2 * size))
            unsorted.push(randNum);
        }
        this.setState({ arr: unsorted, size });
    }

    handleUpdate(e) {
        this.populateArray(e.currentTarget.value);
    }

    render() {
        return (
            <div className="bars-container">
                <div className="bars-controll">
                    <button className="sort-btn hover" onClick={this.handleSort}>
                        Sort
                    </button>
                    <label className="slider-container"> Size 
                        <input
                            type="range"
                            id="slider"
                            onChange={this.handleUpdate}
                            min={this.state.min}
                            max={this.state.max}
                            value={this.state.size}>
                        </input>
                    </label>
                </div>
                <div className="bar-graph">
                    {this.state.arr.map((val, idx) => {
                        return (
                            <div className="i-bar" id={idx} key={idx}>
                                {val}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Bars;