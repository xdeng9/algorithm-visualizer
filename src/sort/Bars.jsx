import React from 'react';
import './bars.css';

class Bars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            min: 10,
            max: 500,
            size: 250
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    handleSort(e) {
        e.preventDefault();
        this.props.quickSort(this.state.arr);
    }

    componentDidMount() {
        this.populateArray();
    }

    populateArray(size = this.state.size) {
        let unsorted = [];
        let randNum = 23;
        for (let i = 0; i < size; i++) {
            randNum = Math.floor(Math.random() * (this.state.max + 100)) + 1;
            unsorted.push(randNum);
        }
        this.setState({ arr: unsorted, size });
    }

    handleUpdate(e) {
        this.populateArray(e.currentTarget.value);
    }

    render() {
        let w = Math.floor(1200 / this.state.size) + 'px';
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
                        let h = val + 'px';
                        return (
                            <div 
                                className="i-bar" 
                                id={idx} 
                                key={idx}
                                style={{ width: w, height: h }}>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Bars;