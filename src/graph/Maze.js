import React from 'react';

class Maze extends React.Component {

    componentDidMount() {
        document.getElementById('maze').classList.add('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
    }

    render() {
        return (
            <div>
                Hello from Maze!
            </div>
        )
    }
}

export default Maze;