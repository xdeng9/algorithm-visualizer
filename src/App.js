import React from 'react';
import './App.css';
import Header from './header/Header';
import { Route } from 'react-router-dom';
import Dijkstra from "./graph/Dijkstra";
import AStar from './graph/AStar';
import Home from './home/Home';

function App() {
  return (
    <div>
      <Header />
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/astar" component={AStar}></Route>
      <Route exact path="/dijkstra" component={Dijkstra}></Route>
    </div>
  );
}

export default App;
