import React, { Component } from 'react';
import Square from './Square';
import './Board.css';
import SelectDisplay from "./SelectDisplay";
import { isShipAround } from './ShipAround';
import { displayShip } from "./DisplayShip";
import { generateRandom, random } from "./GenerateRandom";

const shipsLayout = [
    { type: "DOT"},
    { type: "DOT"},
    { type: 'I'},
    { type: 'L'},
];

const SIZE_MAP = 10;

export default class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            'grid': [],
            'arrayShip': [],
            'counterLife': shipsLayout.length,
            'end': false,
            'newGame': false,
        };
    }

    componentWillMount() {
        this.initialGrid = Array(10).fill().map(x => Array(10).fill().map(y => ({ type: 'Empty', shot: false, life: true })));
        this.setState({
           grid: [...this.initialGrid],
        });
    }

    placeLTail = (grid, arrayI, valueOrientation) => {
        let possiblePoints = [];
        let length = arrayI.length;
        if(valueOrientation === "HOR_LEFT" || valueOrientation === "HOR_RIGHT") {

            possiblePoints.push({ x: arrayI[0].x - 1, y: arrayI[0].y });
            possiblePoints.push({ x: arrayI[0].x + 1, y: arrayI[0].y });
            possiblePoints.push({ x: arrayI[length - 1].x - 1, y: arrayI[0].y });
            possiblePoints.push({ x: arrayI[length - 1].x + 1, y: arrayI[0].y });

            for(let i = 0; i<possiblePoints.length; i++) {
                let isAvailable = !isShipAround(grid, possiblePoints[i].x, possiblePoints[i].y);
                if (isAvailable){
                    return possiblePoints[i];
                }
            }
        } else {

            possiblePoints.push({ x: arrayI[0].x, y: arrayI[0].y - 1 });
            possiblePoints.push({ x: arrayI[0].x, y: arrayI[0].y + 1 });
            possiblePoints.push({ x: arrayI[length - 1].x, y: arrayI[0].y - 1 });
            possiblePoints.push({ x: arrayI[length - 1].x, y: arrayI[0].y + 1 });

            for(let i = 0; i<possiblePoints.length; i++) {
                let isAvailable = !isShipAround(grid, possiblePoints[i].x, possiblePoints[i].y);
                if (isAvailable){
                    return possiblePoints[i];
                }
            }
        }
        return false;
    };

    checkOrientation = (x, y, grid, orientations, size, type) => {

        let {arrayShip} = this.state;
        if(orientations.length === 0) {
           return this.findSpace(grid, size, type);
        }

        let orientation = random(orientations.length);

        let valueOrientation = orientations[orientation];
        let arrayI =  [];

        while (orientations.indexOf(valueOrientation) !== -1) {
            orientations.splice(orientations.indexOf(valueOrientation), 1);
        }

        switch(valueOrientation) {
            case 'HOR_LEFT': {
                for (let i = y; i > y - size; i--) {
                    let isAvailable = !isShipAround(grid, x, i);
                    if (isAvailable) {
                        arrayI.push({x, y: i});
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                if (type === 'L') {
                    let L =  this.placeLTail(grid, arrayI, valueOrientation);
                    if(L) {
                        arrayI.push(L);
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                 arrayShip = displayShip(grid, arrayI, type, arrayShip);

            }break;
            case 'HOR_RIGHT': {
                for(let i = y; i < y + size; i++) {
                    let isAvailable = !isShipAround(grid, x, i);
                    if(isAvailable) {
                        arrayI.push({x, y: i});
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                if (type === 'L') {
                    let L =  this.placeLTail(grid, arrayI, valueOrientation);
                    if(L) {
                        arrayI.push(L);
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                arrayShip = displayShip(grid, arrayI, type, arrayShip);

            } break;
            case 'VER_UP': {
                for(let i = x; i > x - size; i--) {
                    let isAvailable = !isShipAround(grid, i, y);
                    if(isAvailable) {
                        arrayI.push({x: i, y});
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                if (type === 'L') {
                    let L =  this.placeLTail(grid, arrayI, valueOrientation);
                    if(L) {
                        arrayI.push(L);
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                arrayShip = displayShip(grid, arrayI, type, arrayShip);
            } break;
            case 'VER_DOWN': {
                for(let i = x; i < x + size; i++) {
                    let isAvailable = !isShipAround(grid, i, y);
                    if(isAvailable) {
                        arrayI.push({x:i, y});
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                if (type === 'L') {
                    let L =  this.placeLTail(grid, arrayI, valueOrientation);
                    if(L) {
                        arrayI.push(L);
                    } else {
                        return this.checkOrientation(x, y, grid, orientations, size, type)
                    }
                }
                arrayShip = displayShip(grid, arrayI, type, arrayShip);
            } break;
        }
        this.setState({arrayShip});
    };

     findSpace = (grid, size, type) => {

         let orientations = [
             'HOR_LEFT',
             'HOR_RIGHT',
             'VER_UP',
             'VER_DOWN'
         ];

        let coordinates =  generateRandom(SIZE_MAP);

         this.checkOrientation(coordinates.x, coordinates.y, grid, orientations, size, type);
         return grid;
     };

     generateShips = () => {
        this.setState({arrayShip: [], end: false, newGame: true,  counterLife: shipsLayout.length}, () => {
        let grid = JSON.parse(JSON.stringify(this.initialGrid));
        for(let i = 0; i < shipsLayout.length; i++) {
            switch (shipsLayout[i].type) {
                case "DOT": {
                        grid = this.findSpace(grid, 1, "DOT");
                    }
                    break;
                case "I": {
                        grid = this.findSpace(grid, 4, "I");
                    }
                    break;
                case "L": {
                        grid = this.findSpace(grid, 3, "L");
                    break;
                    }
            }
        }
        this.setState({grid});
        });
    };

    shot = () => {
        let { grid, arrayShip, counterLife } = this.state;

        let coordinates =  generateRandom(SIZE_MAP);

        while(grid[coordinates.x][coordinates.y].shot === true) {
            coordinates =  generateRandom(SIZE_MAP);
        }

        if(grid[coordinates.x][coordinates.y].type === "Ship" && grid[coordinates.x][coordinates.y].life) {
            const shipNumber = grid[coordinates.x][coordinates.y].shipNumber;

            arrayShip[shipNumber].coords.map(point => {
                grid[point.x][point.y].shot = true;
                grid[point.x][point.y].life = false;
            });

            counterLife -= 1;

            this.setState({counterLife}, ()=> {
                if (counterLife === 0) {
                    this.setState({'end': true });
                }
            });

        } else {
            grid[coordinates.x][coordinates.y].shot = true;
        }
        this.setState({grid});
    };

    render(){

        let {grid, end, newGame} = this.state;

        const board = grid.map((row, i) => { return (
            <tr key={"row_"+i}>
            {row.map((col, j) => {
                return (
                    <Square type={col.type} life={col.life} shot={col.shot}  key={i+"_"+j} />
                )}
            )
        }
        </tr>)

        });
        return (
            <div style={{ textAlign:'center'}}>
                <div style={{margin: 'auto', width:"40%"}}>
                    <table cellSpacing="0">
                        <tbody>
                        {board}
                        </tbody>
                    </table>
                 </div>
                <br />
                <button className = 'generateShips' onClick={this.generateShips}>Generate Ships</button>
                <SelectDisplay end = {end} start = {newGame} handleClick={()=>this.shot()} />
             </div>
    )}
}