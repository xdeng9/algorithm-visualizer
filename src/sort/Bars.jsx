import React from 'react';
import './bars.css';

class Bars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: [],
            min: 10,
            max: 500,
            size: 250,
            controllDisabled: false
        }

        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.getNewArray = this.getNewArray.bind(this);
    }

    getNewArray(e) {
        e.preventDefault();
        if (this.state.arr.length !== 0) this.populateArray();   
    }

    resetAnimation() {
        for (let idx = 0; idx < this.state.arr.length; idx++) {
            document.getElementById(idx).classList.remove('sorted');
            document.getElementById(idx).classList.remove('swapped');
            document.getElementById(idx).classList.add('unsorted');
        }
    }

    animateSort(steps) {
        this.resetAnimation();
        for (let i = 0; i < steps.length; i++) {    
            setTimeout(() => {
                let step = steps[i];
                let el1 = document.getElementById(step[0]);
                let el2 = document.getElementById(step[1]);

                setTimeout(() => {
                    el1.classList.add('swapped');
                    el2.classList.add('swapped');
                    let h1 = el1.clientHeight;
                    let h2 = el2.clientHeight;
                    let temp = h1;
                    el1.style.height = `${h2}px`;
                    el2.style.height = `${temp}px`;
                }, i * 25 + 30);

                setTimeout(() => {
                    if (step[2] === 'g') {
                        el1.classList.add('sorted');
                        el1.classList.remove('unsorted');
                    } 
                    el1.classList.remove('swapped');
                    el2.classList.remove('swapped');
                }, i * 25 + 70);
            }, i * 25 + 100);
        }
    }

    handleSort(e) {
        e.preventDefault();
        let steps = [];
        let sort = [...this.state.arr];
        this.setState({ controllDisabled: true });
        document.querySelector('.menu-list').classList.add('disable');
        document.querySelector('.title').classList.add('disable');

        if (this.props.type === 'quicksort') {
            this.props.quickSort(sort, 0, sort.length - 1, steps);
            this.animateSort(steps);
        } else if (this.props.type === 'mergesort') {
            this.props.mergeSort(sort, 0, sort.length - 1, [...sort], steps);
            console.log(steps)
        }
        // this.animateSort(steps);
        setTimeout(() => {
            this.setState({ controllDisabled: false, arr: sort })
            document.querySelector('.menu-list').classList.remove('disable');
            document.querySelector('.title').classList.remove('disable');
        }, 50 * steps.length + 600);
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
        this.resetAnimation();
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
                    <button 
                        disabled={this.state.controllDisabled}
                        className="new-array-btn hover" 
                        onClick={this.getNewArray}>
                        New Array
                    </button>
                    <button 
                        disabled={this.state.controllDisabled}
                        className="sort-btn hover" 
                        onClick={this.handleSort}>
                        Sort
                    </button>
                    <label className="slider-container"> Size 
                        <input
                            disabled={this.state.controllDisabled}
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
                                className="i-bar unsorted" 
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