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
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae expedita corrupti laudantium aperiam, doloremque explicabo ipsum earum dicta saepe delectus totam vitae ipsam doloribus et obcaecati facilis eius assumenda, cumque.</p>

                    </div>
                </div>
            </div>
        )
    }
}

export default Home;