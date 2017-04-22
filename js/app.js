
"use strict";

var gameState = "NotStarted"; 
var score = 0; 
var lives = 3; 
var level = 0; 
var gemscount = 0; 
var playerimg = 'images/char-cat-girl.png'; 

var TILE_WIDTH = 101;
var TILE_HEIGHT = 83;

var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

	if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.x = -100;
    }


};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
var Player = function() {
    this.sprite = playerimg;
    this.x = 2 + 120 * (Math.floor(Math.random() * 4)); 
    this.y = 350;
    this.speed = 10;
};

Player.prototype.update = function(dt) {
	this.checkCollisions();
    this.x * (dt);
    this.y * (dt);
    
    if (this.y <= 0) {
        this.reset();
        level = level + 1;
        score = score + 10;
		console.log('win');
	 }

	if (score >40) {
		console.log('GameWin');
		gameState = "GameWin";
	}




};
Player.prototype.render = function() {
	this.renderScoreBoard();
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkCollisions = function() {

		var len=allEnemies.length;
        for (var i = 0; i < len;  i++) {
            if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x &&
                this.y < allEnemies[i].y + 50 && this.y + 50 > allEnemies[i].y) {
                console.log('hit');
				this.lives();
				this.reset();
			}
        }

}
Player.prototype.reset = function() {
    this.x = 100;
    this.y = 400;
};
Player.prototype.water = function() {
    this.x = 100;
    this.y = 0;


};
Player.prototype.lives = function() {
    lives = lives - 1;
	if (lives < 1) {
		console.log('gameover');
		gameState = "GameOver";
	}
};
Player.prototype.renderScoreBoard = function() {
    ctx.fillStyle = '#525c65';
    ctx.fillRect( 0, 0, 505,50);
    ctx.strokeStyle="#FFFFFF";
    ctx.fillStyle = '#000000';
    ctx.font = "16px Arial";
    ctx.strokeText("SCORE: ", 20, 30);
    ctx.strokeText("LEVEL: ", 150, 30);
    ctx.strokeText("LIVE: ", 270, 30);
    ctx.strokeText("GEMS: ", 390, 30);
    ctx.font = "16px Arial";
    ctx.strokeText(score, 100, 30);
    ctx.strokeText(level, 230, 30);
    ctx.strokeText(lives, 340, 30);
    ctx.strokeText(gemscount, 460, 30);
    ctx.save();
};
Player.prototype.handleInput = function(key) {
    if (key === 'left' && this.x > 101) {
        this.x -= TILE_WIDTH;
    } else if (key === 'right' && this.x < 395) {
        this.x += TILE_WIDTH;
    } else if (key === 'up' && this.y > 0) {
        this.y -= TILE_HEIGHT;
    } else if (key === 'down' && this.y < 400) {
        this.y += TILE_HEIGHT;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy(-100, 60, 250);
var enemy2 = new Enemy(-100, 180, 400);
var enemy3 = new Enemy(-100, 240, 150);
var enemy4 = new Enemy(-100, 120, 300);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
