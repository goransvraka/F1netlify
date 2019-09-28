import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div class="container">
                    <div class="row">
                        <div class="col-8">
                            <button class="btn"><i class="fa fa-home"></i>  F-1 Feeder</button>
                        </div>
                        <div class="col-4">
                            <input className="search" type="text" placeholder="Search ..."></input>
                            <button class="btn"><i class="fa fa-search"></i></button>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Header;
