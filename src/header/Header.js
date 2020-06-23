import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
      <div className="header-container">
        <div className="title">
          <Link to='/' className="link hover">
            Algorithm Visualizer
          </Link>
        </div>
        <ul className="menu-list">
          <li>
            <Link to="/dijkstra" className="hover" id="dijkstra">
              Dijkstra's Algorithm
            </Link>
          </li>
          <li>
            <Link to="/astar" className="hover" id="astar">
              A* Search
            </Link>
          </li>
          <li>
            <Link to="/maze" className="hover" id="maze">
              Maze
            </Link>
          </li>
          <li>
            <Link to="/queen" className="hover" id="queen">
              N Queens
            </Link>
          </li>
          <li>
            <Link to="/quicksort" className="hover" id="quicksort">
              Quick Sort
            </Link>
          </li>
          <li>
            <Link to="/mergesort" className="hover" id="mergesort">
              Merge Sort
            </Link>
          </li>
        </ul>
      </div>
    );
}

export default Header;