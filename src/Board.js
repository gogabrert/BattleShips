import React, { Component } from 'react';
import Square from './Square';
import './Board.css';


const shipsLayout = [
    { type: "DOT"},
    { type: "DOT"},
    { type: 'I'},
    { type: 'L'},
];

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

     random = (max, min = 0) =>{
        return Math.floor(Math.random() * (max - min) + min);
    };

    placeLTail = (grid, arrayI, valueOrientation) => {
        let possiblePoints = [];
        let length = arrayI.length;
        if(valueOrientation === "HOR_LEFT" || valueOrientation === "HOR_RIGHT") {

            possiblePoints.push({ x: arrayI[0].x - 1, y: arrayI[0].y });
            possiblePoints.push({ x: arrayI[0].x + 1, y: arrayI[0].y });
            possiblePoints.push({ x: arrayI[length - 1].x - 1, y: arrayI[0].y });
            possiblePoints.push({ x: arrayI[length - 1].x + 1, y: arrayI[0].y });

            for(let i = 0; i<possiblePoints.length; i++) {
                let isAvailable = !this.isShipAround(grid, possiblePoints[i].x, possiblePoints[i].y);
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
                let isAvailable = !this.isShipAround(grid, possiblePoints[i].x, possiblePoints[i].y);
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

        let orientation = this.random(orientations.length);
        let valueOrientation = orientations[orientation];
        let arrayI =  [];

        while (orientations.indexOf(valueOrientation) !== -1) {
            orientations.splice(orientations.indexOf(valueOrientation), 1);
        }

        switch(valueOrientation) {
            case 'HOR_LEFT': {
                for (let i = y; i > y - size; i--) {
                    let isAvailable = !this.isShipAround(grid, x, i);
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
                const shipNumber = arrayShip.push({
                    type,
                    coords: arrayI,
                }) - 1;
                for (let j = 0; j < arrayI.length; j++) {
                    grid[arrayI[j].x][arrayI[j].y].type = "Ship";
                    grid[arrayI[j].x][arrayI[j].y].shipNumber = shipNumber;
                }
                arrayI = [];
            }
             break;
            case 'HOR_RIGHT': {
                for(let i = y; i < y + size; i++) {
                    let isAvailable = !this.isShipAround(grid, x, i);
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
                const shipNumber = arrayShip.push({
                    type,
                    coords: arrayI,
                }) - 1;
                for (let j = 0; j < arrayI.length; j++) {
                    grid[arrayI[j].x][arrayI[j].y].type = "Ship";
                    grid[arrayI[j].x][arrayI[j].y].shipNumber = shipNumber;
                }
                arrayI = [];
            } break;
            case 'VER_UP': {
                for(let i = x; i > x - size; i--) {
                    let isAvailable = !this.isShipAround(grid, i, y);
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
                const shipNumber = arrayShip.push({
                    type,
                    coords: arrayI,
                }) - 1;
                for (let j = 0; j < arrayI.length; j++) {
                    grid[arrayI[j].x][arrayI[j].y].type = "Ship";
                    grid[arrayI[j].x][arrayI[j].y].shipNumber = shipNumber;
                }
                arrayI = [];
            } break;
            case 'VER_DOWN': {
                for(let i = x; i < x + size; i++) {
                    let isAvailable = !this.isShipAround(grid, i, y);
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
                const shipNumber = arrayShip.push({
                    type,
                    coords: arrayI,
                }) - 1;
                for (let j = 0; j < arrayI.length; j++) {
                    grid[arrayI[j].x][arrayI[j].y].type = "Ship";
                    grid[arrayI[j].x][arrayI[j].y].shipNumber = shipNumber;
                }
                arrayI = [];
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

         let index_X = this.random(10);
         let index_Y = this.random(10);

         this.checkOrientation(index_X, index_Y, grid, orientations, size, type);
         return grid;
     };

    generateShips = () => {
        this.setState({arrayShip: [], end: false, newGame: true,  counterLife: shipsLayout.length}, () => {
        let grid = JSON.parse(JSON.stringify(this.initialGrid));
        for(let i = 0; i < shipsLayout.length; i++) {
            switch (shipsLayout[i].type) {
                case "DOT": {
                    while(true) {
                        grid = this.findSpace(grid, 1, "DOT");
                            break;
                        }
                    }
                    break;
                case "I": {
                    while(true) {
                        grid = this.findSpace(grid, 4, "I");
                        break;
                    }
                    break;
                }
                case "L": {
                    while(true) {
                        grid = this.findSpace(grid, 3, "L");
                        break;
                    }
                    break;
                }
            }
        }
        this.setState({grid});
        });
    };

    isShipAround = (field, x, y) => {

        if(x > field.length - 1 || x < 0 || y > field[0].length - 1 || y < 0) {
            return true;
        }
        const up = Math.max(x - 1, 0);
        const left = Math.max(y - 1, 0);
        const down = Math.min(x + 1, field.length - 1);
        const right = Math.min(y + 1, field[0].length - 1);

        return field[x][y].type === 'Ship' || field[up][y].type === 'Ship' || field[x][left].type === 'Ship'
            || field[down][y].type === 'Ship' || field[x][right].type === 'Ship' || field[up][left].type === 'Ship'
            || field[down][left].type === 'Ship' || field[up][right].type === 'Ship' || field[down][right].type === 'Ship';
    };

    shot = () => {
        let { grid, arrayShip, counterLife } = this.state;
        let index_X = this.random(10);
        let index_Y = this.random(10);

        if(grid[index_X][index_Y].type === "Ship" && grid[index_X][index_Y].life) {
            const shipNumber = grid[index_X][index_Y].shipNumber;
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
            grid[index_X][index_Y].shot = true;
        }
        this.setState({grid});
    };

    selectDisplay = (end, start)  => {
        let display;
        if(end) {
            display =  <p>END GAME</p>
        } else if(start) {
            display =  <button className= 'shoot' onClick={this.shot}>Shoot</button>;
        } else {
            display =  <p>TO START, CLICK GENERATE SHIP</p>
        }
        return display;
    };

    render(){
        const style={
            textAlign: "center",
            margin:"auto",
            height: "auto",
            width:"500px",
            border:"1px solid black",
            tableLayout:'fixed',
        };

        let {grid, end, newGame} = this.state;
        const board = grid.map((row, i) => { return (
            <tr key={"row_"+i}>
            {row.map((col, j) => {
                return (
                    <Square type={col.type} life={col.life} shot={col.shot} handleClick={()=>this.handleClick(i,j)}  key={i+"_"+j} />
                )}
            )
        }
        </tr>)
        });
        return (
            <div style={{ textAlign:'center'}}>
                <div style={{margin: 'auto', width:"40%"}}>
                    <table cellSpacing="0" style={style}>
                        <tbody>
                        {board}
                        </tbody>
                    </table>
                 </div>
                <br />
                <button className= 'generateShips' onClick={this.generateShips}>Generate Ships</button>
                {
                    this.selectDisplay(end, newGame)
                }
             </div>
    )
    }
}