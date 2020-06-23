import React from 'react';
import './bars.css';

class Bars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            min: 5,
            max: 1000,
            size: 500
        }

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    componentDidMount() {
        this.populateArray();
    }

    populateArray(size = 500) {
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
                    <button className="sort-btn hover">
                        Start
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
                            <div className={idx} key={idx}>
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