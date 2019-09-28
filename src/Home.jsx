import React from 'react';
import history from './history';


class Home extends React.Component {

    getDropList() {
        const tempYear = 1950;
        return (
            Array.from(new Array(70), (v, i) =>
                <option key={i} value={tempYear + i}>{tempYear + i}</option>
            )
        );
    }




    render() {
        console.log(this.props.data);
        return (
            <div className="homemain">
                <div className="homediv">
                    <div className="p-4">
                        <p>Formula F-1 Feeder</p>
                        <p>Choose year in dropdown meny to view more information</p>
                        <select value={this.props.year} onChange={this.props.updateGod}>
                            {this.getDropList()}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;