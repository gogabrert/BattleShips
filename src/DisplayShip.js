export const displayShip = (grid, arrayI, type, arrayShip) => {

    const shipNumber = arrayShip.push({
        type,
        coords: arrayI,
    }) - 1;
    for (let j = 0; j < arrayI.length; j++) {
        grid[arrayI[j].x][arrayI[j].y].type = "Ship";
        grid[arrayI[j].x][arrayI[j].y].shipNumber = shipNumber;
    }
    arrayI = [];
    return arrayShip;
};