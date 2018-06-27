import React, { Component } from 'react';

export default class Square extends Component{
    render(){
        let {type, life, shot} = this.props;
        let color = 'black';
        let backgroundColor = 'white';
        let border = ".5px solid black";

        if (type === "Ship") {
             color = 'red';
             border = "2px solid red";
        }
        if(!life && shot){
            backgroundColor = 'red';
        } else if(shot) {
            backgroundColor = 'black';
        }
        return (
            <td
                style={{
                    overflow:'hidden',
                    width:'auto',
                    height:'45px',
                    backgroundColor: backgroundColor,
                    borderColor: color,
                    border: border
                }}
                >
            </td>
        )
    }
}