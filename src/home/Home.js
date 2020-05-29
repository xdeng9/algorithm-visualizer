import React from 'react';

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
                Hello
            </div>
        )
    }
}

export default Home;