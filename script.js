

// Game Constants and Variables.

let inputDirrection = {x:0,y:0};
//initially the snake is at the rest position.
const foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new  Audio('movesound.mp3');
const musicsound = new Audio('backgroundmusic.mp3');

let speed = 5;
let lastPaintTime = 0;
let score = 0;

let snakeArr = [
    { x:13 , y:15}
]
food = {x: 6, y: 7};


// Game Functions

function main(currenttime)
{
    window.requestAnimationFrame(main);
    if((currenttime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    // the above if condition is used to reduce
    // the pixels rate of the game as it was
    // already very fast.
    lastPaintTime = currenttime;
    // console.log(currenttime);
    gameEngine();
    // gameEngine is a function.

}


function isCollide(snake)
{
    // if you bump into yourself
    for(let i = 1; i < snakeArr.length ; i++)
   {
    // here we are starting the value of i from 1
    // as we are not including the head portion.

        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
        {
            return true;
        }
    } 
    
    // if you bump into the wall.
    if(snake[0].x >= 21 || snake[0].x<=0 || snake[0].y>=21 || snake[0].y<=0)
    {
        return true;
    }

return false;
}



function gameEngine(){
// Part 1 : updating the snake array and food.

if(isCollide(snakeArr))
{
    gameoversound.play();
    musicsound.pause();
    inputDirrection = {x:0,y:0};
    prompt("Game Over! Press any key to play again!");
    snakeArr = [
        { x:13 , y:15}
    ]
    musicsound.play();
    score = 0;

    // i.e 

    //if collision occurs by any how then
    // we will be implementing the above given
    // commands which will ultimately return the
    // snake pointer to the initial position
    // from where the game has begun .

}


// if you have eaten the food then 
//increment the score and regenerate the food.

if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
{
    foodsound.play();
    snakeArr.unshift({x: snakeArr[0].x + inputDirrection.x, y: snakeArr[0].y + inputDirrection.y});
    // unshift adds one or more element to
    // the beginning of the array and returns
    // the new length of the array.
    let a = 2;
    let b = 19;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}


           // Moving the snake //
// for(let i = snakeArr.length - 2 ; i>=0 ; i--)
// { 
    // snakeArr[i+1] = {...snakeArr[i]};
    // making the last element the first element
    // and repeating the process.
// }

// but where will the first element go???????????
// we will be updating the element

// snakeArr[0].x += inputDirreectionection.x;
// snakeArr[0].y += inputDirreectionection.y;


for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDirrection.x;
snakeArr[0].y += inputDirrection.y;




// Part 2 : Displaying the snake and food.

// Displaying the snake.

    board.innerHTML = "";
    snakeArr.forEach((e,index)=>
    {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // append child allows you to add a 
        //node to the end of the list of the 
        //child nodes.
        if(index === 0)
        {
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });


    // Displying the food.
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}




// Main logic starts here


window.requestAnimationFrame(main);
// we usually use this following function
// while rendering the animation and here 
//it includes the usage of the main function.

window.addEventListener('keydown', e =>{
   let inputDirrection = {x: 0, y: 1} // Start the game
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