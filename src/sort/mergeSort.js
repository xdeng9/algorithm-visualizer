import React from 'react';
import Bars from './Bars';

class MergeSort extends React.Component {

    componentDidMount() {
        document.getElementById('mergesort').classList.add('active');
        document.getElementById('queen').classList.remove('active');
        document.getElementById('maze').classList.remove('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
        document.getElementById('quicksort').classList.remove('active');
    }

    render() {
        return (
            <Bars type="mergesort"/>
        )
    }
}

export default MergeSort;