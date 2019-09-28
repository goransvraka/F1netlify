import React from 'react';
import * as $ from 'jquery';
import {
    Link,
} from "react-router-dom";
import history from './history';
import NationalityFlag from './NationalityFlag.json';
let year2 = ""

class Drivers extends React.Component {
    constructor() {
        super();
        this.state = {
            drivers: [],
            countryImg: NationalityFlag,
            isLoading: 0,
        }
        this.getDrivers = this.getDrivers.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
    }

    componentDidMount() {
        year2 = this.props.year
        this.getDrivers();
    }

    componentDidUpdate(prevProps) {
        if (this.props.year !== prevProps.year) {
            this.setState({
                isLoading: 0
            })
            year2 = this.props.year
            this.getDrivers();
        }
    }

    updateInfo(info) {
        this.props.updateInfo(info)
    }

    getDrivers() {
        console.log(this.props.year)
        if (this.props.year === null) {
            year2 = localStorage.getItem("year")
        }
        var url = `https://ergast.com/api/f1/${year2}/driverStandings.json`;
        $.get(url, (data) => {
            if (data.MRData.StandingsTable.StandingsLists[0] === undefined) {
                this.setState({ isLoading: 1 });
            } else {
                this.setState({
                    drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
                    isLoading: 2
                });
            }
        })
    }
    render() {
        if (this.state.isLoading === 0) {
            return <div className="homemain">
                <div className="homediv">
                    <div className="p-4">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </div>
        }
        if (this.state.isLoading === 1) {
            return <div className="homemain">
                <div className="homediv text-center">
                    <div className="p-4">
                        <h1 className="typewriter">No data for this year...</h1>
                    </div>
                </div>
            </div>
        }
        return (
            <div className="main">
                <div className="naslov">Drivers Championship</div>
                <table className="tabela table-hover">
                    <thead className="theader">
                        <tr><th colSpan="4">Drivers Championship Standings - {year2}</th></tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map((drivers, i) => { return <Driver key={i} year={year2} updateInfo={this.updateInfo} data={drivers} flagsImgProps={this.state.countryImg} /> })}
                    </tbody>
                </table>
            </div>
        );
    }
}
class Driver extends React.Component {
    render() {
        let country = this.props.flagsImgProps.filter(country => country.nationality === this.props.data.Driver.nationality)[0]
        if (country === undefined) {
            country = { driverId: "vettel", countryImgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" }
        }
        return (
            <tr><td>{this.props.data.position}</td>
                <td><img src={country.flagUrl} alt="flag-country_code" width="50" height="30" />
                    &nbsp; &nbsp; <Link onClick={() => {
                        history.push('/' + this.props.year + '/Driverdetails/' + this.props.data.Driver.driverId);
                        this.props.updateInfo(this.props.data.Driver.givenName + " " + this.props.data.Driver.familyName);
                        console.log(localStorage.getItem("driverData"))
                    }}><i>{this.props.data.Driver.givenName} {this.props.data.Driver.familyName}</i></Link></td>
                <td>{this.props.data.Constructors[0].name}</td>
                <td>{this.props.data.points}</td>
            </tr>
        );
    }
}
export default Drivers;