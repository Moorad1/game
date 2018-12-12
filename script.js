var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var keys = {
	up:false,
	down:false,
	right:false,
	left:false
}

class GameObject {
	constructor(velocity,friction) {
		this.velocity = velocity;
		this.friction = friction;
		this.camera = {
			x:0,
			y:0
		};
	}
}

class FullPlayer {
	constructor(x, y, velocityX,velocityY,health,size) {
		this.x = x,
		this.y = y,
		this.velocityX = velocityX;
		this.velocityY = velocityY;
		this.health = health;
		this.size = size;
		this.dead = false;
	}

	draw() {
		ctx.fillRect(this.x - Game.camera.x, this.y - Game.camera.y, this.size, this.size);
	}

	restart() {
		this.dead = false;
		this.x = 0;
		this.y = 0;
		this.health = 5;
	}
}

var player = new FullPlayer(200,200,0,0,10,50);

var Game = new GameObject(8,0.95);

update();


function update() {
	window.requestAnimationFrame(update);
	ctx.clearRect(0,0,canvas.width,canvas.height);	
	ctx.fillStyle = '#000000';
	movement();
	player.draw();
	border();
}

document.onkeydown = (e) => {
	if (e.keyCode === 38 || e.keyCode === 87) {
		keys.up = true;
	} else if (e.keyCode === 40 || e.keyCode === 83) {
		keys.down = true;	
	}
	if (e.keyCode === 37 || e.keyCode === 65) {
		keys.left = true;
	} else if (e.keyCode === 39 || e.keyCode === 68) {
		keys.right = true;
	}
};

function movement() {
	player.velocityX = 0;
	player.velocityY = 0;
	if (keys.up == true) {
		player.velocityY = -Game.velocity;
	}
	if (keys.down == true) {
		player.velocityY = Game.velocity;
	}
	if (keys.left == true) {
		player.velocityX = -Game.velocity;
		Game.camera.x -= Game.velocity;
	}
	if (keys.right == true) {
		player.velocityX = Game.velocity;
		Game.camera.x += Game.velocity;
	}

	player.x += player.velocityX;
	player.y += player.velocityY;
	Game.camera.x = player.x - (canvas.width / 2) + player.size / 2;
	Game.camera.y = player.y - (canvas.height / 2) + player.size / 2;
}

document.onkeyup = (e) => {
	if (e.keyCode === 38 || e.keyCode === 87) {
		keys.up = false;
	} else if (e.keyCode === 40 || e.keyCode === 83) {
		keys.down = false;	
	}
	if (e.keyCode === 37 || e.keyCode === 65) {
		keys.left = false;
	} else if (e.keyCode === 39 || e.keyCode === 68) {
		keys.right = false;
	}
};


function border() {
	for (var i = 0;i < 30;i++) {
		ctx.fillRect((50*i) - Game.camera.x,0 - Game.camera.y,50,50);
		ctx.fillRect((50*i) - Game.camera.x,50*29 - Game.camera.y,50,50);
		ctx.fillRect(0 - Game.camera.x,50*i - Game.camera.y,50,50);
		ctx.fillRect(50*29 - Game.camera.x,50*i - Game.camera.y,50,50);
	}
}