import React from 'react';
import * as $ from 'jquery';
import './index.css';
import FlagImageList from "./FlagImageList.json";
import NationalityFlag from './NationalityFlag.json';

var raceID = "";

class Racedetails extends React.Component {
    constructor() {
        super();
        this.state = {
            year: localStorage.getItem("year"),
            race: [],
            raceResul: [],
            countryFlag: FlagImageList,
            flagsImg: NationalityFlag,
            isLoading: 0
        }
        this.getAllData = this.getAllData.bind(this);
    }
    componentDidMount() {
        this.getAllData();
    }

    getAllData() {
        raceID = this.props.match.params.raceID
        var firstCall = $.ajax(`http://ergast.com/api/f1/${this.state.year}/${raceID}/qualifying.json`);
        var secondCall = $.ajax(`http://ergast.com/api/f1/${this.state.year}/${raceID}/results.json`);
        $.when(firstCall, secondCall).done(function (data1, data2) {
            if (data1[0].MRData.RaceTable.Races[0] === undefined || data2[0].MRData.RaceTable === undefined) {
                this.setState({ isLoading: 1 });
            } else {
                this.setState({
                    race: data1[0].MRData.RaceTable.Races,
                    raceResul: data2[0].MRData.RaceTable.Races,
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
        
        let raceCountryImgUrl = this.state.countryFlag.filter(drzava => drzava.raceName === this.state.race[0].raceName)[0]
        if (raceCountryImgUrl === undefined) {
            raceCountryImgUrl = { countryImgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" }
        }
        return (
            <div className="row centralni m-0">
                <div className="col-xl-2 grandtablelevi no-gutters">
                    <div className="row m-0">
                        <div className="teamlogo col-6 col-sm-6 col-md-5 col-lg-4 col-xl-12 m-0 p-0">
                            <div className="row h-100 m-0">
                                <div className="col-12 col-xl-12" style={{ textAlign: "center", padding: "3%" }}>
                                    <img src={raceCountryImgUrl.countryImgUrl} alt="flag-country_code" width="75%" height="75%" />
                                </div>
                                <div className="col-12 col-xl-12" style={{ textAlign: "center", padding: "3px" }}>
                                    {this.state.race[0].raceName}
                                </div>
                            </div>

                        </div>
                        <div className="teaminfo col-6 col-sm-6 col-md-7 col-lg-8 col-xl-12 m-0 p-4 text-center text-md-left my-auto">
                            <p>Country: {this.state.race[0].Circuit.Location.country} </p>
                            <p>Location: {this.state.race[0].Circuit.Location.locality}</p>
                            <p>Date: {this.state.race[0].date}</p>
                            <p>Full Report: <a href={this.state.race[0].url} target="_blank" rel="noopener noreferrer"> &nbsp;<i className="fa fa-external-link" style={{ color: "rgb(174, 211, 248)" }}></i></a></p>
                        </div>
                    </div>
                </div>

                <div className="col-xl-5 grandtabledesni no-gutters">
                    <table className="table-hover">
                        <thead>
                            <tr><th colSpan="5">Qualifying results</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Pos</td><td>Driver</td><td>Team</td><td>Best Time</td></tr>

                            {this.state.race[0].QualifyingResults.map((race, i) => { return <QualifyingResul key={i} year={this.state.year} data={race} raceResul={this.state.raceResul} flagsImgProps={this.state.flagsImg} /> })}

                        </tbody>
                    </table>
                </div>

                <div className="col-xl-5 grandtabledesni no-gutters">
                    <table className="table-hover">
                        <thead>
                            <tr><th colSpan="2">Race Results</th><th></th><th></th><th></th><th></th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Pos</td><td>Driver</td><td>Team</td><td>Results</td><td>Points</td></tr>
                            {this.state.raceResul[0].Results.map((raceResul, i) => { return <RacesResul key={i} year={this.state.year} data={raceResul} race={this.state.race} flagsImgProps={this.state.flagsImg} /> })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

class RacesResul extends React.Component {
    render() {
        let country = this.props.flagsImgProps.filter(country => country.nationality === this.props.data.Driver.nationality)[0]
        if (country === undefined) {
            country = { driverId: "vettel", countryImgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" }
        }
        let status1 = ""
        if (this.props.data.status === "Finished") {
            status1 = this.props.data.Time.time
        } else {
            status1 = this.props.data.status
        }
        return (
            <tr>
                <td>{this.props.data.position}</td>
                <td>
                    <img src={country.flagUrl} alt="flag-country_code" width="32" height="20" />
                    {this.props.data.Driver.familyName}
                </td>
                <td>{this.props.data.Constructor.name}</td>
                <td>{status1}</td>
                <td className={"mesto" + this.props.data.position}>{this.props.data.points}</td>
            </tr>
        );
    }
}

class QualifyingResul extends React.Component {
    render() {
        var t = [(this.props.data.Q1), (this.props.data.Q2), (this.props.data.Q3)];
        function sortTimes(arrayOfTimes) {
            return arrayOfTimes.sort((a, b) => {
                const aParts = getNumericParts(a);
                const bParts = getNumericParts(b);
                return aParts[0] - bParts[0] || aParts[1] - bParts[1];
            });
            function getNumericParts(time) {
                return time.split(' ')[0].split(':').map(x => +x);
            }
        }
        sortTimes(t);
        let bestTime = sortTimes(t)[0];
        let bestTime1 = bestTime === "" ? "NoResults" : sortTimes(t)[0]

        let country = this.props.flagsImgProps.filter(country => country.nationality === this.props.data.Driver.nationality)[0]
        if (country === undefined) {
            country = { driverId: "vettel", url: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" }
        }
        return (
            <tr>
                <td>{this.props.data.position}</td>
                <td>
                    <img src={country.flagUrl} alt="flag-country_code" width="32" height="20" />
                    {this.props.data.Driver.familyName}
                </td>
                <td>{this.props.data.Constructor.name}</td>
                <td>{bestTime1}</td>
            </tr>
        );
    }
}

export default Racedetails;
