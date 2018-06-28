import React, { Component } from 'react';


export default class SelectDisplay extends Component {

    render() {

        let {end, start} = this.props;

        let display;
        if(end) {
            display =  <p>END GAME</p>
        } else if(start) {
            display =  <button className= 'shoot' onClick={this.props.handleClick}>Shoot</button>;
        } else {
            display =  <p>TO START, CLICK GENERATE SHIP</p>
        }
        return (
            display
        )
    }
}