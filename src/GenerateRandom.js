export const random = (max, min = 0) =>{
    return Math.floor(Math.random() * (max - min) + min);
};

export const generateRandom = (size) => {
    let index_X = random(size);
    let index_Y = random(size);
    return {x: index_X, y: index_Y}
};