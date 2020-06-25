import React from 'react';
import Bars from './Bars';
import { partition } from './sortUtil';

class QuickSort extends React.Component {

    componentDidMount() {
        document.getElementById('quicksort').classList.add('active');
        document.getElementById('queen').classList.remove('active');
        document.getElementById('maze').classList.remove('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
        document.getElementById('mergesort').classList.remove('active');
    }

    quickSort(array, i = 0, j = array.length - 1, steps) {
        if (i >= j) {
            if (i >= 0 && i < array.length)
                steps.push([i, i, 'g']);
            return array;
        }

        let pivot = partition(array, i, j, steps);
        
        this.quickSort(array, i, pivot - 1, steps);
        this.quickSort(array, pivot + 1, j, steps);

        return array
    }

    render() {
        return (
            <Bars type="quicksort" quickSort={this.quickSort}/>
        )
    }
}

export default QuickSort;