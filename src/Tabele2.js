import React from 'react';

import * as $ from 'jquery';

class Tabele2 extends React.Component {

    constructor() {

        super();

        this.state = {

            team: [],

            teamResul: [],

            isLoading: true,

            isLoading2: true

        }

        this.getTeam = this.getTeam.bind(this);
    }

    componentDidMount() {

        this.getTeam();

        this.getResults();

    }

    getTeam() {
        var url = "http://ergast.com/api/f1/2013/constructors/red_bull/constructorStandings.json";
        $.get(url, (data) => {
            this.setState({ team: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings, isLoading: false });
        })
    }

    getResults() {

        var url2 = "http://ergast.com/api/f1/2013/constructors/red_bull/results.json";

        $.get(url2, (data) => {

            this.setState({ teamResul: data.MRData.RaceTable.Races, isLoading2: false });

        })
    }

    render() {

        if (this.state.isLoading || this.state.isLoading2) {
            return <h3>It is loading...</h3>;
        }

        return (
            <div className="centralni">
                <div className="teamlevi">
                    <div className="teamlogo">
                        <div>

                            <img src="https://www.stickpng.com/assets/thumbs/580b57fcd9996e24bc43c1e6.png" alt="Team logo" width="100" height="100" />

                        </div>

                        <div>

                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/23px-Flag_of_Austria.svg.png" alt="Country flag" />

                            <h4>{this.state.team[0].Constructor.name}</h4>

                        </div>

                    </div>

                    <div className="teaminfo">

                        <p>Country: {this.state.team[0].Constructor.nationality}</p>

                        <p>Position: {this.state.team[0].position}</p>

                        <p>Points: {this.state.team[0].points}</p>

                        <p>History: <a href={this.state.team[0].Constructor.url} target="_blank" rel="noopener noreferrer">dgdf</a></p>

                    </div>

                </div>

                <div className="teamdesni">

                    <table>

                        <thead>

                            <tr><th colSpan="2">Drivers Championship Standings - YEAR</th><th></th><th></th></tr>

                        </thead>

                        <tbody>

                            <tr><td>Round</td><td>Grand Prix</td><td>{this.state.teamResul[0].Results[0].Driver.familyName}</td><td>{this.state.teamResul[0].Results[1].Driver.familyName}</td><td>Points</td></tr>

                            {this.state.teamResul.map((teamResul, i) => { return <TeamResul key={i} data={teamResul} /> })}

                        </tbody>
                    </table>
                </div>
            </div>

        );

    }

}

class TeamResul extends React.Component {

    render() {

        return (

            <tr><td>{this.props.data.round}</td>

                <td>{this.props.data.raceName}</td>

                <td>{this.props.data.Results[0].position}</td>

                <td>{this.props.data.Results[1].position}</td>

                <td>{parseInt(this.props.data.Results[0].points) + parseInt(this.props.data.Results[1].points)}</td>




            </tr>

        );

    }

}




export default Tabele2;