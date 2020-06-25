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

    quickSort(array, steps) {
        if (array.length <= 1) return array;

        let pivotIndex = partition(array, steps);
        
        let leftArr = this.quickSort(array.slice(0, pivotIndex), steps);
        let rightArr = this.quickSort(array.slice(pivotIndex + 1), steps);

        return leftArr.concat([array[pivotIndex]]).concat(rightArr);
    }


    render() {
        return (
            <Bars type="quicksort" quickSort={this.quickSort}/>
        )
    }
}

export default QuickSort;