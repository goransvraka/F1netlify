import React from 'react';
import $ from 'jquery';
import { Link } from "react-router-dom";
import history from './history';
import TeamLogo from './TeamLogo.json';

class Teams extends React.Component {
    constructor() {
        super();

        this.state = {
            year: localStorage.getItem("year"),
            teams: [],
            isLoading: 0,
            logoTeam: TeamLogo
        }
        this.getTeams = this.getTeams.bind(this);
        this.updateInfo = this.updateInfo.bind(this);

    }

    componentDidMount() {
        this.getTeams();
    }

    updateInfo(info) {
        this.props.updateInfo(info)

    }

    getTeams() {
        var url = `http://ergast.com/api/f1/${this.state.year}/constructorStandings.json`;
        $.get(url, (data) => {
            if (data.MRData.StandingsTable.StandingsLists[0] === undefined) {
                console.log("undefined data")
                this.setState({ isLoading: 1 });

            } else {
                this.setState({
                    teams: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
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
                <div className="naslov">Constructor Championship</div>
                <table className="tabela table-hover">
                    <thead className="theader">
                        <tr><th colSpan="4">Constructor Championship Standings - {this.state.year}</th></tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map((teams, i) => { return <Constructors key={i} year={this.state.year} updateInfo={this.updateInfo} data={teams} logoImgProps={this.state.logoTeam} /> })}
                    </tbody>
                </table>
            </div>
        );
    }
}

class Constructors extends React.Component {
    render() {
        let logo = this.props.logoImgProps.filter(country => country.constructorId === this.props.data.Constructor.constructorId)[0]
        if (logo === undefined) {
            logo = { constructorId: "random", logoUrl: "https://www.motori.gr/sites/default/files/newsartimagesmore/2017/11/26/photon23270f60544.jpg" }
        }
        return (
            <tr><td>{this.props.data.position}</td>
                <td>
                    <img src={logo.logoUrl} alt="flag-country_code" width="85" height="30" /> &nbsp;
                    <Link onClick={() => {
                        history.push('/' + this.props.year + '/Teamlink/' + this.props.data.Constructor.constructorId);
                        this.props.updateInfo(this.props.data.Constructor.name);
                    }}>
                        {this.props.data.Constructor.name}</Link>
                </td>
                <td><a href={this.props.data.Constructor.url}  rel="noopener noreferrer" target="_blank">Details <i className="fa fa-external-link"></i></a></td>
                <td>{this.props.data.points}</td>
            </tr>
        );
    }
}
export default Teams;