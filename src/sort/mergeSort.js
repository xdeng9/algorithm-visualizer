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

    mergeSort(arr, lo, hi, arr2, steps) { 
        if (lo === hi) return;
        let mid = (lo + hi) >> 1;
        this.mergeSort(arr2, lo, mid, arr, steps);
        this.mergeSort(arr2, mid + 1, hi, arr, steps);
        merge(arr, lo, mid, hi, arr2, steps);
    }

    render() {
        return (
            <Bars type="mergesort" mergeSort={this.mergeSort}/>
        )
    }
}

export default MergeSort;