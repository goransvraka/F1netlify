import React from 'react';
import logo from './formula-2.jpg';
import nav1 from './helmet.png';
import nav2 from './teams.png';
import nav3 from './races.png';

class Navigation extends React.Component {
    render() {
        return (

            <div className="navigation">
                <img className="logo" src={logo} alt="Formula logo" />
                <div class="vertical-menu">
                    <a className="nav1" className="active" href="index.html"><img src={nav1} alt="Drivers" />Drivers</a>
                    <a className="nav2" href="#"><img src={nav2} alt="Teams" />Teams</a>
                    <a className="nav3" href="#"><img src={nav3} alt="Races" />Races</a>
                </div>
            </div>

        );
    }
}

export default Navigation;