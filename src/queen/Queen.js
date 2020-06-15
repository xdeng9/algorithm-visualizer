import React from 'react';

class Queen extends React.Component {

    componentDidMount() {
        document.getElementById('queen').classList.add('active');
        document.getElementById('maze').classList.remove('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
    }
    
    render() {
        return (
            <div className="board-container">
                
            </div>
        )
    }
}

export default Queen;