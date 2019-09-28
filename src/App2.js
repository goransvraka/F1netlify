import React from "react";
import {
    Route,
    NavLink,
    Router,
    Link
} from "react-router-dom";
import history from './history';
import Drivers from './Drivers';
import Teams from './Teams';
import Races from './Races';
import Driverdetails from './Driverdetails';
import Teamlink from "./Teamlink";
import GrandPrix from "./GrandPrix";
import './index.css';
import logo from './formula-1.png';
import nav1 from './helmet.png';
import nav2 from './teams.png';
import nav3 from './races.png';


class App extends React.Component {
    render() {
        const routes = [
            {
                path: "/",
                exact: true,
                header: () => <button className="btn_blue">Drivers</button>,
            },
            {
                path: "/Teams",
                exact: true,
                header: () => <button className="btn_blue">Teams</button>,
            },
            {
                path: "/Races",
                header: () => <button className="btn_blue">Races</button>,
            },
            {
                path: "/Teamlink/:teamID",
                header: () => <div className="d-inline"><Link to="/Teams"><button className="btn">Teams</button></Link><button className="btn_blue">Teamlink</button></div>,
            },
            {
                path: "/Driverdetails",
                header: () => <div className="d-inline"><Link exact to="/"><button className="btn">Driver</button></Link><button className="btn_blue">Driver details</button></div>,
            },
            {
                path: "/GrandPrix",
                header: () => <div className="d-inline"><Link to="/Races"><button className="btn">Races</button></Link><button className="btn_blue">Grand Prix</button></div>,
            },/**/
        ];
        return (

            <Router history={history}>
                <div className="container no-gutters">
                    <div className="row p-0">
                        <div className="col-2 pr-0 no-gutters" id="sticky-sidebar">
                            <div className="sticky-top">
                            <img className="logo" src={logo} alt="Formula logo" />
                            <div className="vertical-menu">
                                <NavLink exact to="/"><img src={nav1} alt="Drivers" />Drivers</NavLink>
                                <NavLink to="/Teams"><img src={nav2} alt="Teams" />Teams</NavLink>
                                <NavLink to="/Races"><img src={nav3} alt="Races" />Races</NavLink>
                            </div>
                            </div>
                        </div>
                        <div className="col-10 no-gutters" id="main">
                            <div className="row header p-2 sticky-top no-gutters">
                                <div className="col-7">
                                    <NavLink to="/"><button className="btn"><i className="fa fa-home"></i>  F-1 Feeder</button></NavLink>
                                    <div className="d-inline">
                                        {routes.map((route, index) => (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                exact={route.exact}
                                                component={route.header}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="col-5">
                                    <form action="https://google.com/search">
                                        <input className="search" type="text" placeholder=" Search ..."></input>
                                        <button className="btn_search fa fa-search" type="submit"></button>
                                    </form>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <Route exact path="/" component={Drivers} />
                                    <Route path="/Teams" component={Teams} />
                                    <Route path="/Races" component={Races} />
                                    <Route path="/Teamlink/:teamID" component={Teamlink} />
                                    <Route path="/Driverdetails/:driverID" component={Driverdetails} />
                                    <Route path="/GrandPrix" component={GrandPrix} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;