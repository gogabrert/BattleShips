export const isShipAround = (field, x, y) => {

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