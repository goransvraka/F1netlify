import React from 'react';
import DriversImagesList from './DriversImagesList.json';
import FlagImageList from './FlagImageList.json';
import NationalityFlag from './NationalityFlag.json';

import $ from 'jquery';
import {
    Link,
} from "react-router-dom";
import history from './history';

var driverID = "";



class Driverdetails extends React.Component {

    constructor() {

        super();

        this.state = {
            year: localStorage.getItem("year"),
            driver: [],
            driverResul: [],
            isLoading: 0,
            driversImg: DriversImagesList,
            flagsImg: FlagImageList,
            countryImg: NationalityFlag,
            countries: NationalityFlag
        }

        this.getAllData = this.getAllData.bind(this);
        this.updateInfo = this.updateInfo.bind(this);

    }

    componentDidMount() {
        this.getAllData();
    }


    updateInfo(info) {
        this.props.updateInfo(info)

    }

    getAllData() {
        driverID = this.props.match.params.driverID
        this.setState({
            year: localStorage.getItem("year")
        })
        var firstCall = $.ajax(`https://ergast.com/api/f1/${this.state.year}/drivers/${driverID}/driverStandings.json`);
        var secondCall = $.ajax(`https://ergast.com/api/f1/${this.state.year}/drivers/${driverID}/results.json`);
        $.when(firstCall, secondCall).done(function (data1, data2) {
            if (data1[0].MRData.StandingsTable.StandingsLists[0] === undefined || data2[0].MRData.RaceTable === undefined) {
                this.setState({ isLoading: 1 });

            } else {
                this.setState({
                    driver: data1[0].MRData.StandingsTable.StandingsLists[0].DriverStandings,
                    driverResul: data2[0].MRData.RaceTable.Races,
                    isLoading: 2
                });
            }

        }.bind(this));
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

        let driverImgUrl = this.state.driversImg.filter(vozac => vozac.driverId === this.state.driver[0].Driver.driverId)[0]
        if (driverImgUrl === undefined) {
            driverImgUrl = { driverId: "vettel", url: "https://www.mementoexclusives.com/images/companies/1/F1%20art%20Lewis%20Hamilton%20advert%20400px.jpg?1557742421050" }
        }

        let driverCountryImgUrl = this.state.countryImg.filter(drzava => drzava.nationality === this.state.driver[0].Driver.nationality)[0]
        if (driverCountryImgUrl === undefined) {
            driverCountryImgUrl = { driverId: "vettel", url: "https://www.countryflags.io/de/shiny/32.png" }
        }
        return (
            <div className="row centralni">
                <div className="col-xl-3 tablelevi no-gutters">
                    <div className="row m-0">
                        <div className="teamlogo col-6 col-sm-6 col-md-5 col-lg-4 col-xl-12 m-0 p-0">
                            <div className="row h-100 m-0">
                                <div className="col-12 col-xl-12" style={{ textAlign: "center", padding: "3%" }}>
                                    <img className="vozacImg" src={driverImgUrl.url} alt="Team logo" width="100%" height="100%" />
                                </div>
                                <div className="col-12 col-xl-12" style={{ textAlign: "center", padding: "3px" }}>
                                    <img src={driverCountryImgUrl.flagUrl} alt="flag-country_code" width="30%" />
                                    <h4>{this.state.driver[0].Driver.givenName}</h4>
                                    <h4>{this.state.driver[0].Driver.familyName}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="teaminfo col-6 col-sm-6 col-md-7 col-lg-8 col-xl-12 m-0 p-4 text-center text-md-left my-auto">
                            <p>Country: {this.state.countries.filter(country => country.nationality === this.state.driver[0].Driver.nationality)[0].country}</p>
                            { /*<p>Country: {this.state.driver[0].Driver.nationality}</p>*/}
                            <p>Team: {this.state.driver[0].Constructors[0].name}</p>
                            <p>Birth: {this.state.driver[0].Driver.dateOfBirth}</p>
                            <p>Biography: <a href={this.state.driver[0].Driver.url} target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link" style={{ color: "rgb(174, 211, 248)" }}></i></a></p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 tabledesni no-gutters">
                    <table className="table-hover">
                        <thead>
                            <tr><th colSpan="5">Formula 1 Results - {this.state.year}</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Round</td><td>Grand Prix</td><td>Team</td><td>Grid</td><td>Race</td></tr>
                            {this.state.driverResul.map((driverResul, i) => { return <DriverResul key={i} year={this.state.year} updateInfo={this.updateInfo} data={driverResul} flagsImgProps={this.state.flagsImg} /> })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class DriverResul extends React.Component {
    render() {
        let country = this.props.flagsImgProps.filter(country => country.raceName === this.props.data.raceName)[0]
        if (country === undefined) {
            country = { driverId: "vettel", countryImgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" }
        }
        return (
            < tr > <td>{this.props.data.round}</td>
                <td><Link onClick={() => {
                    history.push('/' + this.props.year + '/Racedetails/' + this.props.data.round);
                    this.props.updateInfo(this.props.data.raceName);
                }}><img src={country.countryImgUrl} alt="flag-country_code" width="32" height="20" />
                    &nbsp;&nbsp; {this.props.data.raceName}
                </Link></td>
                <td>{this.props.data.Results[0].Constructor.name}</td>
                <td>{this.props.data.Results[0].grid}</td>
                <td className={"mesto" + this.props.data.Results[0].position}>{this.props.data.Results[0].position}</td>
            </tr >
        );
    }
}


export default Driverdetails;