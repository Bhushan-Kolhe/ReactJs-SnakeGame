window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.className += ' .hidden';
});

var canvasCollection = document.getElementsByClassName("CanvasCollection");
function setCanvas(){
    canvasCollection[0].innerHTML = `<canvas id="canvas" width="${canvasCollection[0].clientWidth}" height="${canvasCollection[0].clientHeight}"></canvas>`;   
}
setCanvas()
var canvas = document.getElementById("canvas");
var width = canvas.width;
var height = canvas.height;
var ctx = canvas.getContext("2d");
var snakeSize = 5;
var speed = 100;
var snake = [];
var foodColor = "#f71e5c";
var backgroundColor = "#131515";
var snakeColor = "#85CB33";
var snakeHeadColor = "#85CB33";
var strokeColor = "#131515";
var cellWidth = 10;
var score = 0;
var topScore = 0;
var direction = 0;
var textColor = "#ffffff";
var food = {
    foodX:0,
    foodY:0
};
var kill = false;



function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function init(){
    kill = false;
    direction = 0;
    snake = [];
    snakeSize = 5;
    score = 0;
    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = strokeColor;
    ctx.fillRect(0,0,width,height);
    ctx.strokeRect(0,0,width,height);
    var snakeCell = {
        x: Math.floor((width/cellWidth)/2) * cellWidth,
        y: Math.floor((height/cellWidth)/2) * cellWidth
    };
    snake.push(snakeCell);
    for(var i = 1; i<snakeSize; i++){
        var yCord = snakeCell.y - i*cellWidth;
        snake.push({
            x:snakeCell.x,
            y:yCord
        });
    }
    ctx.font = "20px Arial";
    drawFood();
    drawSnake();
    document.addEventListener("keydown", keyInput, false);
    if(typeof game_loop != "undefined") 
        clearInterval(game_loop);
	game_loop = setInterval(game, speed);
}

function drawFood(){
    var foodx = getRandomInteger(0,Math.floor(width/cellWidth)-1);
    var foody = getRandomInteger(0,Math.floor(height/cellWidth)-1);
    food.foodX = foodx * cellWidth;
    food.foodY = foody * cellWidth;
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.foodX, food.foodY, cellWidth, cellWidth);
}

function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = strokeColor;
    var i = 0;
    snake.forEach((snakeCell)=>{
        if(i==0) {
            ctx.strokeStyle = snakeHeadColor;
            ctx.fillStyle = snakeHeadColor;
        }
        else {
            ctx.strokeStyle = strokeColor;
            ctx.fillStyle = snakeColor;
        }
        
        ctx.fillRect(snakeCell.x, snakeCell.y, cellWidth, cellWidth);
        ctx.strokeRect(snakeCell.x, snakeCell.y, cellWidth, cellWidth);
        i++;
    });
}

function game(){
    ctx.fillStyle = backgroundColor;
    ctx.strokeStyle = strokeColor;
    ctx.fillRect(0,0,width,height);
    ctx.strokeRect(0,0,width,height);
    var env;
    var x = snake[0].x;
    var y = snake[0].y;
    if(direction == 0){
        y += cellWidth;
    }else if(direction == 11){
        y -= cellWidth;
    }else if(direction == 01){
        x += cellWidth;
    }else{
        x -= cellWidth;
    }
    
    if( x<0 || y<0 || x>(width-cellWidth) || y>(height-cellWidth)|| checkCollision(x,y) || kill == true){
        init();
        return;
    }

    if( x == food.foodX && y == food.foodY){
        var tail = {
            x:x,
            y:y
        };
        score++;
        snakeSize++;
        drawFood();
    }else{
        var tail = snake.pop();
        tail.x = x;
        tail.y = y;
    }

    snake.unshift(tail);
    drawSnake();
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.foodX, food.foodY, cellWidth, cellWidth);
    var score_text = "Score: " + score;
    ctx.fillStyle = textColor;
    ctx.fillText(score_text, width - 100, 30);
}

function networkInput(keyValue){
    if(keyValue == 3 && direction != 01) direction = 10;
    else if(keyValue == 2 && direction != 0) direction = 11;
    else if(keyValue == 1 && direction != 10) direction = 01;
    else if(keyValue == 0 && direction != 11) direction = 0;
}
function checkCollision(x, y){
    for(var i=1; i<snakeSize; i++){
        if(snake[i].x == x && snake[i].y==y){
            return true;
        }
    }
    return false;
}
function keyInput(event){
    var keyValue = event.keyCode;
    if(keyValue == 37 && direction != 01) direction = 10;
    else if(keyValue == 38 && direction != 0) direction = 11;
    else if(keyValue == 39 && direction != 10) direction = 01;
    else if(keyValue == 40 && direction != 11) direction = 0;
}
function dist(x1,y1,x2,y2){
    return Math.floor(Math.sqrt(Math.pow(y2-y1,2) + Math.pow(x2-x1,2)));
}


function touchInput(dir) {
    if( dir < 225 && direction != 01)  direction = 10;
    else if( dir < 135 && direction != 0) direction = 11;
    else if( (dir > 315 || dir < 45) && direction != 10) direction = 01;
    else if( dir < 315 && direction != 11) direction = 0; 
}

init()


$("#canvas").touchwipe({
    wipeLeft: function() { if(direction != 01)  direction = 10; },
    wipeRight: function() { if(direction != 10) direction = 01; },
    wipeUp: function() {  if(direction != 11) direction = 0; },
    wipeDown: function() {  if(direction != 0) direction = 11; },
    min_move_x: 20,
    min_move_y: 20,
    preventDefaultEvents: true
});

