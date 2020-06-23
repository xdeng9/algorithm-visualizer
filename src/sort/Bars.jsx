import React from 'react';

class Bars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arr: []
        }
    }

    render() {
        return (
            <div className="bars-container">
                <div className="bars-controll">

                </div>
            </div>
        )
    }
}

export default Bars;