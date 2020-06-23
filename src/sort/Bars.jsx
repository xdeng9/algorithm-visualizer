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

    handleUpdate(e) {
        this.setState({ size: e.currentTarget.value })
    }

    render() {
        return (
            <div className="bars-container">
                <div className="bars-controll">
                    <button>
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
            </div>
        )
    }
}

export default Bars;