import React from 'react';
import * as $ from 'jquery';

/*class Tabele extends React.Component {
    constructor() {
        super();

        this.state = {
            drivers: []
        }
    }

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers() {
        var url = "http://ergast.com/api/f1/2013/driverStandings.json";
        $.get(url, (data) => {
            this.setState({ drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings });
        })

    }


    render() {
        return (
            <div className="main">
                <div className="naslov">Drivers Championship</div>
                <table className="tabela">
                    <thead className="theader">
                        <tr><th colSpan="2">Drivers Championship Standings - 1950</th><th></th><th></th></tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map((drivers, i) => { return <Driver key={i} data={drivers} /> })}
                    </tbody>
                </table>

            </div>
        );
    }
}


class Driver extends React.Component {
    render() {
        console.log(this.props.data);
        return (

            <tr><td>{this.props.data.position}</td>
                <td>{this.props.data.Driver.givenName} {this.props.data.Driver.familyName}</td>
                <td>{this.props.data.Constructors[0].name}</td>
                <td>{this.props.data.points}</td>
            </tr>
        );
    }
}
class Tabele extends React.Component {
    constructor() {
        super();

        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        this.getTeams();
    }

    getTeams() {
        var url = 'http://ergast.com/api/f1/2013/constructorStandings.json';
        $.get(url, (data) => {
            this.setState({ teams: data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings });
        })

    }
    render() {
        return (
            <div className="main">
                <div className="naslov">Constructor Championship</div>
                <table className="tabela">
                    <thead className="theader">
                        <tr><th colSpan="2">Constructor Championship Standings - 2013</th><th></th><th></th></tr>
                    </thead>
                    <tbody>
                        {this.state.teams.map((teams, i) => { return <Constructors key={i} data={teams} /> })}
                    </tbody>
                </table>

            </div>
        );
    }
}


class Constructors extends React.Component {
    render() {
        console.log(this.props.data);
        return (

            <tr><td>{this.props.data.position}</td>
                <td>{this.props.data.Constructor.name}</td>
                <td><a href="">Details</a></td>
                <td>{this.props.data.points}</td>
            </tr>
        );
    }
}
export default Tabele;*/





/*
import React from 'react';
import * as $ from 'jquery';
import { year } from './App';


class Tabele extends React.Component {
    constructor() {
        super();

        this.state = {
            drivers: []
        }
    }

    componentDidMount() {
        this.getDrivers();
        console.log(year)
    }

    getDrivers() {
        var url = "http://ergast.com/api/f1/" + year + "/driverStandings.json";
        $.get(url, (data) => {
            this.setState({ drivers: data.MRData.StandingsTable.StandingsLists[0].DriverStandings });
        })

    }






    render() {
        return (
            <div>
                <h1>Drivers Championship</h1>
                <table>
                    <thead>
                        <tr><th colSpan="2">Drivers Championship Standings - YEAR</th><th></th><th></th></tr>
                    </thead>
                    <tbody>
                        {this.state.drivers.map((drivers, i) => { return <Driver key={i} data={drivers} /> })}
                    </tbody>
                </table>

            </div>
        );
    }
}


class Driver extends React.Component {
    render() {
        return (

            <tr><td>{this.props.data.position}</td>
                <td>{this.props.data.Driver.givenName} {this.props.data.Driver.familyName}</td>
                <td>{this.props.data.Constructors[0].name}</td>
                <td>{this.props.data.points}</td>
            </tr>
        );
    }
}

export default Tabele;
*/
