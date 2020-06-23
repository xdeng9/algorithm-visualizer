import React from 'react';
import './App.css';
import Header from './header/Header';
import { Route } from 'react-router-dom';
import Dijkstra from "./graph/Dijkstra";
import AStar from './graph/AStar';
import Maze from './graph/Maze';
import Queen from './queen/Queen';
import QuickSort from './sort/QuickSort';
import MergeSort from './sort/MergeSort';
import Home from './home/Home';

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/dijkstra" component={Dijkstra}></Route>
      <Route exact path="/astar" component={AStar}></Route>
      <Route exact path="/maze" component={Maze}></Route>
      <Route exact path="/queen" component={Queen}></Route>
      <Route exact path="/quicksort" component={QuickSort}></Route>
      <Route exact path="/mergesort" component={MergeSort}></Route>
    </div>
  );
}

export default App;
