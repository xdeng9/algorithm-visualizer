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

    quickSort(array) {
        if (array.length <= 1) return array;

        let pivotIndex = partition(array);
        
        let leftArr = array.slice(0, pivotIndex);
        let rightArr = array.slice(pivotIndex);

        return this.quickSort(leftArr).concat([array[pivotIndex]]).concat(this.quickSort(rightArr));
    }


    render() {
        return (
            <Bars type="quicksort" quickSort={this.quickSort}/>
        )
    }
}

export default QuickSort;