import React from 'react';
import * as $ from 'jquery';
import TeamLogo from './TeamLogo.json';
import NationalityFlag from './NationalityFlag.json';
import FlagImageList from './FlagImageList.json';

var teamID = "";

class Teamlink extends React.Component {
    constructor() {
        super();

        this.state = {
            year: localStorage.getItem("year"),
            team: [],
            teamResul: [],
            logoImg: TeamLogo,
            flagImg: NationalityFlag,
            flagsImg: FlagImageList,
            isLoading: 0,
        }
        this.getAllData = this.getAllData.bind(this);
    }

    componentDidMount() {
        this.getAllData();
    }

    getAllData() {
        teamID = this.props.match.params.teamID
        var firstCall = $.ajax(`https://ergast.com/api/f1/${this.state.year}/constructors/${teamID}/constructorStandings.json`);
        var secondCall = $.ajax(`https://ergast.com/api/f1/${this.state.year}/constructors/${teamID}/results.json`);
        $.when(firstCall, secondCall).done(function (data1, data2) {
            if (data1[0].MRData.StandingsTable.StandingsLists[0] === undefined || data2[0].MRData.RaceTable === undefined) {
                this.setState({ isLoading: 1 });

            } else {
                this.setState({
                    team: data1[0].MRData.StandingsTable.StandingsLists[0].ConstructorStandings,
                    teamResul: data2[0].MRData.RaceTable.Races,
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
        let constrLogoUrl = this.state.logoImg.filter(vozac => vozac.constructorId === this.state.team[0].Constructor.constructorId)[0]
        if (constrLogoUrl === undefined) {
            constrLogoUrl = { logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjuYsmRrVNzho4nriYS130Vq_siUT0BKHBoIlNQ9El8Px0i8mkBAfvCB34KA" }
        }
        let constructorCountryImgUrl = this.state.flagImg.filter(drzava => drzava.nationality === this.state.team[0].Constructor.nationality)[0]
        if (constructorCountryImgUrl === undefined) {
            constructorCountryImgUrl = { driverId: "vettel", flagUrl: "https://www.countryflags.io/de/shiny/32.png" }
        }
        let driverName = this.state.teamResul.filter(race => race.Results[1] !== undefined)
        let driverName2 = "no data"
        if (driverName[0] !== undefined) {
            driverName2 = driverName[0].Results[1].Driver.familyName
        }
        return (
            <div className="row centralni m-0">

                <div className="col-xl-3 tablelevi no-gutters">
                    <div className="row m-0">
                        <div className="teamlogo col-6 col-sm-6 col-md-5 col-lg-4 col-xl-12 m-0 p-0">
                            <div className="row h-100 m-0">
                                <div className="col-12 col-xl-12" style={{ textAlign: "center", padding: "3%" }}>
                                    <img src={constrLogoUrl.logoUrl} alt="Team logo" width="100%" />
                                </div>
                                <div className="col-12 col-xl-12" style={{ textAlign: "center", padding: "3px" }}>&nbsp;
                        <img src={constructorCountryImgUrl.flagUrl} alt="flag-country_code" width="30%" />
                                    <h4>{this.state.team[0].Constructor.name}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="teaminfo col-6 col-sm-6 col-md-7 col-lg-8 col-xl-12 m-0 p-4 text-center text-md-left my-auto">
                            <p>Country: {this.state.team[0].Constructor.nationality}</p>
                            <p>Position: {this.state.team[0].position}</p>
                            <p>Points: {this.state.team[0].points}</p>
                            <p>History: <a href={this.state.team[0].Constructor.url} target="_blank" rel="noopener noreferrer"> &nbsp;<i className="fa fa-external-link" style={{ color: "rgb(174, 211, 248)" }}></i></a></p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 tabledesni no-gutters">

                    <table className="table-hover">
                        <thead>
                            <tr><th colSpan="5">Formula 1 Results - {this.state.year}</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Round</td><td>Grand Prix</td><td>{this.state.teamResul[0].Results[0].Driver.familyName}</td><td>{driverName2}</td><td>Points</td></tr>
                            {this.state.teamResul.map((teamResul, i) => {
                                return <TeamResul key={i} data={teamResul} year={this.state.year} team={this.state.team[0]} flagsImgProps={this.state.flagsImg} />
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


class TeamResul extends React.Component {
    render() {
        let drugiRez = "no data"
        let drugiPoints = 0
        let country = this.props.flagsImgProps.filter(country => country.raceName === this.props.data.raceName)[0]
        if (country === undefined) {
            country = { driverId: "vettel", countryImgUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1280px-Flag_of_Germany.svg.png" }
        }
        if (!(this.props.data.Results[1] === undefined)) {
            drugiRez = this.props.data.Results[1].position
            drugiPoints = +this.props.data.Results[1].points
        }
        return (
            <tr><td>{this.props.data.round}</td>
                <td>
                    <img src={country.countryImgUrl} alt="flag-country_code" width="32" height="20" />&nbsp;
                    {this.props.data.raceName}
                </td>
                <td className={"mesto" + this.props.data.Results[0].position}>{this.props.data.Results[0].position}</td>
                <td className={"mesto" + drugiRez}>{drugiRez}</td>
                <td>{+this.props.data.Results[0].points + drugiPoints}</td>
            </tr>
        );
    }

}

export default Teamlink;