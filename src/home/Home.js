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
                <div class="modal-overlay" id="modal-overlay"></div>

                <div class="modal" id="modal">
                    <div class="modal-guts">
                        <h1>About</h1>
                        <p>Hello, thank you for checking out my app. 
                            My name is Joseph Deng. I created this algorithm visualizer using React because I think this is
                            a great way to solidify my understanding of how different algorithms work.</p>
                        <p>To get started, click on any of the algorithms from the top menu, and click the start button
                            to see it in action. 
                        </p>
                        <p>
                            Currently supports:
                            <li>
                                Dijkstra's - an algorithm for finding the shortest path. 
                            </li>
                            <br/>
                            Work in progress:
                            <li>
                                A* Algorithm - a more optimal path finding algorithm. Faster than Dijkstra's.
                            </li>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;