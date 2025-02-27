import {
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED,
    ifSnakeIntersects,
    getSnakeHead,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { isOutsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {
    if (gameOver) {
        if (confirm("Game Over. Press OK to restart")) {
            window.location = '/' // current location of website, acts as refresh
        }
        return
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = "";
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = isOutsideGrid(getSnakeHead()) || ifSnakeIntersects();
}
