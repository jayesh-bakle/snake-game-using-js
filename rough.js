// Game Constants & Variables
let inputDirrection = {x: 0, y: 0}; 
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new  Audio('movesound.mp3');
const musicsound = new Audio('backgroundmusic.mp3');
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 21 || snake[0].x <=0 || snake[0].y >= 21 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameoversound.play();
        musicsound.pause();
        inputDirrection =  {x: 0, y: 0}; 
        prompt("Game Over!Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicsound.play();
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodsound.play();
        score = score + 1;
        if(score>highscore)
        {
            highscoreval = score;
            localStorage.getItem("highscoreBox",JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "Highscore:" + highscore;
        }
        scoreBox.innerHTML = "SCORE:" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDirrection.x, y: snakeArr[0].y + inputDirrection.y});
        let a = 2;
        let b = 20;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDirrection.x;
    snakeArr[0].y += inputDirrection.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here

let highscore = localStorage.getItem("highscoreBox");
if(highscore === null)
{
    highscoreval = 0;
    localStorage.getItem("highscoreBox",JSON.stringify(highscoreval));
}
else{
    highscoreval  = JSON.parse(highscore);
    highscoreBox.innerHTML = "HighScore : " + highscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDirrection = {x: 0, y: 1} // Start the game
    movesound.play();
    musicsound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirrection.x = 0;
            inputDirrection.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDirrection.x = 0;
            inputDirrection.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirrection.x = -1;
            inputDirrection.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDirrection.x = 1;
            inputDirrection.y = 0;
            break;
        default:
            break;
    }

});