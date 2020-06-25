import React from 'react';
import './home.css'

class Home extends React.Component {

    componentDidMount() {
        const menuList = document.querySelectorAll(".menu-list li a");
        for (let i = 0; i < menuList.length; i++) {
            menuList[i].classList.remove('active');
        }
    }

    render() {
        return (
            <div className="home-box">
                <div className="modal-overlay" id="modal-overlay"></div>

                <div className="modal" id="modal">
                    <div className="modal-guts">
                        <h1>About</h1>
                        <p>Hello, thank you for checking out algorithm visualizer, a tool for visualizing different algorithms. 
                            I created this tool because I think this is
                            a great way to solidify my understanding of how different algorithms work.</p>
                        <p>To get started, click on any of the algorithms from the top menu, and click the start button
                            to see it in action. 
                        </p>
                        <p>
                            Algorithms:
                            <li>
                                Dijkstra's - an algorithm for finding the shortest path. 
                            </li>
                            <li>
                                A* Algorithm - a more optimal path finding algorithm. Faster than Dijkstra's.
                            </li>
                            <li>
                                Maze - used Prim's algorithm to randomly generate a maze. 
                            </li>
                            <li>
                                N Queens - a puzzle for placing N queens (using backtracking) on a NxN board. 
                            </li>
                            <li>
                                Merge Sort - a sorting algorithm that uses the divide and conquer approach.
                            </li>
                            <li>
                                Quick Sort - another divide and conquer sorting algorithm.
                            </li>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;