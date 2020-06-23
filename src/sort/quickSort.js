import React from 'react';
import Bars from './Bars';

class QuickSort extends React.Component {

    componentDidMount() {
        document.getElementById('quicksort').classList.add('active');
        document.getElementById('queen').classList.remove('active');
        document.getElementById('maze').classList.remove('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
        document.getElementById('mergesort').classList.remove('active');
    }

    render() {
        return (
            <Bars type="quicksort"/>
        )
    }
}

export default QuickSort;