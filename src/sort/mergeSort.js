import React from 'react';
import Bars from './Bars';
import { merge } from './sortUtil'

class MergeSort extends React.Component {

    componentDidMount() {
        document.getElementById('mergesort').classList.add('active');
        document.getElementById('queen').classList.remove('active');
        document.getElementById('maze').classList.remove('active');
        document.getElementById('dijkstra').classList.remove('active');
        document.getElementById("astar").classList.remove("active");
        document.getElementById('quicksort').classList.remove('active');
    }

    mergeSort(arr, i, j, steps) {
        if (arr.length <= 1) {
            
            return arr;
        }

        let mid = (i + j) >> 1;
        let left = arr.slice(0, mid);
        let right = arr.slice(mid);
    }

    render() {
        return (
            <Bars type="mergesort" mergeSort={this.mergeSort}/>
        )
    }
}

export default MergeSort;