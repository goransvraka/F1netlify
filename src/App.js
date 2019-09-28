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
import Racedetails from "./Racedetails";
import './index.css';
import logo from './formula-1.png';
import logo2 from './formula-1-small.png';
import nav1 from './helmet.png';
import nav2 from './teams.png';
import nav3 from './races.png';
import Home from './Home'


if (localStorage.getItem("year") === null) {
    localStorage.setItem("year", "2013")
}

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            year: localStorage.getItem("year"),
            driverData: localStorage.getItem("driverData"),

        }
        this.updateGod = this.updateGod.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    updateInfo(parametar) {
        localStorage.setItem("navInfo", parametar)
    }

    getDropList() {
        const tempYear = 1950;
        return (
            Array.from(new Array(70), (v, i) =>
                <option key={i} value={tempYear + i}>{tempYear + i}</option>
            )
        );
    }

    updateGod(god) {
        localStorage.setItem("year", god.target.value)
        this.setState({
            year: localStorage.getItem("year")
        })
        history.push(`/${god.target.value}/Drivers`)
    }

    render() {
        const routes = [
            {
                path: `/${this.state.year}/Drivers`,
                exact: true,
                header: () => <button className="btn_blue">Drivers</button>,
            },
            {
                path: `/${this.state.year}/Teams`,
                header: () => <button className="btn_blue">Teams</button>,
            },
            {
                path: `/${this.state.year}/Races`,
                header: () => <button className="btn_blue">Races</button>,
            },
            {
                path: `/${this.state.year}/Teamlink`,
                header: () => <div className="d-inline"><Link to={`/${this.state.year}/Teams`}><button className="btn">Teams</button></Link><button className="btn_blue">{localStorage.getItem("navInfo")}</button></div>,
            },
            {
                path: `/${this.state.year}/Driverdetails`,
                header: () => <div className="d-inline"><Link to={`/${this.state.year}/Drivers`}><button className="btn">Drivers</button></Link><button className="btn_blue">{localStorage.getItem("navInfo")}</button></div>,
            },
            {
                path: `/${this.state.year}/Racedetails`,
                header: () => <div className="d-inline"><Link to={`/${this.state.year}/Races`}><button className="btn">Races</button></Link><button className="btn_blue">{localStorage.getItem("navInfo")}</button></div>,
            },
        ];
        return (

            <Router history={history}>
                <div className="container p-0 m-0" style={{ maxWidth: "1200px", minWidth: "320px" }}>
                    <div className="row p-0 m-0" >
                        <div className="col-md-2 col-lg-2 col-xl-2 pr-0 no-gutters">
                            <div className="sticky-top">
                                <div className="d-none d-md-block"><img className="logo sticky-sidebar" src={logo} alt="Formula logo" /></div>
                                <div className="d-block d-md-none text-center sticky-sidebar"><img className="logo2" src={logo2} alt="Formula logo" /></div>
                                {/*Biranje godine*/}


                                {/*Navigacija na ekranu širine od 768px(md)*/}
                                <div className="vertical-menu sticky-sidebar d-none d-md-block">
                                    <NavLink exact to={`/${this.state.year}/Drivers`}><img src={nav1} alt="Drivers" />Drivers</NavLink>
                                    <NavLink to={`/${this.state.year}/Teams`}><img src={nav2} alt="Teams" />Teams</NavLink>
                                    <NavLink to={`/${this.state.year}/Races`}><img src={nav3} alt="Races" />Races</NavLink>
                                    <div className="sticky-sidebar p-2 text-center" style={{ borderTop: "1px solid grey", borderBottom: "1px solid grey" }}>
                                        <div className="p-2" style={{ color: "white" }}>Choose year: <select value={this.state.year} onChange={this.updateGod}>
                                            {this.getDropList()}
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                {/*Navigacija na ekranu širine do 768px(md)*/}
                                <div className="vertical-menu2 d-block d-md-none">
                                    <NavLink exact to={`/${this.state.year}/Drivers`}><img src={nav1} alt="Drivers" />Drivers</NavLink>
                                    <NavLink to={`/${this.state.year}/Teams`}><img src={nav2} alt="Teams" />Teams</NavLink>
                                    <NavLink to={`/${this.state.year}/Races`}><img src={nav3} alt="Races" />Races</NavLink>
                                    <div className="sticky-sidebar p-2 text-center" style={{ borderTop: "1px solid grey", borderBottom: "1px solid grey" }}>
                                        <div className="p-2" style={{ color: "white" }}>Choose year: <select value={this.state.year} onChange={this.updateGod}>
                                            {this.getDropList()}
                                        </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-10 col-lg-10 col-xl-10 m-0 p-0">
                            <div className="row sticky-top header p-2 no-gutters" style={{ borderRadius: "0px 0px 20px 0px" }}>
                                <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                                    <NavLink to={`/`}><button className="btn"><i className="fa fa-home"></i>  F-1 Feeder</button></NavLink>
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
                                <div className="col-sm-12 col-md-4 col-lg-4 col-xl-3 p-4 p-md-0">
                                    <div id="cx">
                                        <div className="gcse-search"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="row no-gutters m-0 p-0">
                                <div className="col-12 m-0 p-0">

                                    <Route exact path={`/`} render={(props) => <Home {...props} updateGod={this.updateGod} year={this.state.year} />} />
                                    <Route path={`/:year/Drivers`} render={(props) => <Drivers {...props} year={this.state.year} updateInfo={this.updateInfo} />} />
                                    <Route path={`/:year/Teams`} render={(props) => <Teams {...props} updateInfo={this.updateInfo} />} />
                                    <Route path={`/:year/Races`} render={(props) => <Races {...props} updateInfo={this.updateInfo} />} />
                                    <Route path={`/:year/Teamlink/:teamID`} component={Teamlink} />
                                    <Route path={`/:year/Driverdetails/:driverID`} render={(props) => <Driverdetails {...props} updateInfo={this.updateInfo} />} />
                                    <Route path={`/:year/Racedetails/:raceID`} component={Racedetails} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Router >
        );
    }
}

export default App;