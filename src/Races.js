import React from 'react';
import * as $ from 'jquery';
import {
    Link,
} from "react-router-dom";

import FlagImageList from './FlagImageList.json';
import history from './history';


class Races extends React.Component {
    constructor() {
        super();

        this.state = {
            year: localStorage.getItem("year"),
            races: [],
            countryGrand: FlagImageList,
            isLoading: 0
        }
        this.getRaces = this.getRaces.bind(this);
        this.updateInfo = this.updateInfo.bind(this);


    }

    componentDidMount() {
        this.getRaces();
    }

    updateInfo(info) {
        this.props.updateInfo(info)

    }

    getRaces() {
        var url = `https://ergast.com/api/f1/${this.state.year}/results/1.json`;
        $.get(url, (data) => {
            if (data.MRData.RaceTable === undefined) {
                this.setState({ isLoading: 1 });

            } else {
                this.setState({
                    races: data.MRData.RaceTable.Races,
                    isLoading: 2
                });
            }
        })

    }
    render() {
        console.log(this.state.year)

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
            <div className="main no-gutters">
                <div className="naslov">Race Calendar</div>
                <table className="tabela table-hover">
                    <thead className="theader">
                        <tr><th colSpan="5">Race Calendar - {this.state.year}</th></tr>
                        <tr className="zaglavlje"><th>Round</th><th>Grand Prix</th><th>Circuit</th><th>Date</th><th>Winner</th></tr>
                    </thead>
                    <tbody>
                        {this.state.races.map((races, i) => { return <Calendar key={i} year={this.state.year} updateInfo={this.updateInfo} data={races} logoImgProps={this.state.countryGrand} /> })}

                    </tbody>
                </table>

            </div>
        );
    }
}


class Calendar extends React.Component {
    render() {

        let country = this.props.logoImgProps.filter(country => country.raceName === this.props.data.raceName)[0]
        if (country === undefined) {
            country = { driverId: "vettel", countryImgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" }
        }
        return (
            <tr><td>{this.props.data.round}</td>
                <td>
                    <img src={country.countryImgUrl} alt="flag-country_code" width="50" height="30" /> &nbsp;
                    <Link onClick={() => {
                        history.push('/' + this.props.year + '/Racedetails/' + this.props.data.round);
                        this.props.updateInfo(this.props.data.raceName);
                    }}>{this.props.data.raceName}</Link></td>
                <td>{this.props.data.Circuit.circuitName}</td>
                <td>{this.props.data.date}</td>
                <td>{this.props.data.Results[0].Driver.familyName}</td>
            </tr>
        );
    }
}
export default Races;
