var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
var keys = {
	up:false,
	down:false,
	right:false,
	left:false
};

var player = new Player(200,200,0,0,10,50);

var bullets = [];
var enemies = [];

for (var x = 0; x < 10;x ++) {
	enemies.push(new Enemy(Math.floor(Math.random() * 1450),Math.floor(Math.random() *1450),5))
}

var Game = new GameObject(8,0.95);

var mouse = {
	x:0,
	y:0
}

canvas.addEventListener('click', (evt) => {
	mouse.x = evt.offsetX;
	mouse.y = evt.offsetY;
	Shooting();
});

update();


function update() {
	window.requestAnimationFrame(update);
	ctx.clearRect(0,0,canvas.width,canvas.height);	
	ctx.fillStyle = '#000000';
	movement();
	player.draw();
	border();
	bullets.forEach((bullet) => {
		bullet.show();
		bullet.update();
	});

	enemies.forEach((enemy) => {
		enemy.show();
		enemy.update();
	});
	collision();
	ctx.fillStyle = '#F55536';
	ctx.fillRect(20,20,30*player.health,40);

	ctx.font = '40px Arial';
	ctx.fillText('Wave: -1',canvas.width - 220,60);
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

function Shooting() {
	var angle = Math.atan2(mouse.y - canvas.height/2, mouse.x - canvas.width/2);
	console.log(angle);
	var bVelocityX = Math.cos(angle);
	var bVelocityY = Math.sin(angle);
	console.log(bVelocityX,bVelocityY);
	bullets.push(new Bullet(player.x + (player.size/2) - 10,player.y + (player.size/2) - 10,bVelocityX * 10 ,bVelocityY * 10));
}

function collision() {
	for (var e = 0; e < bullets.length;e++) {
		if (bullets[e].y < 0 || bullets[e].y > 1450 || bullets[e].x < 0 ||bullets[e].x > 1450) {
			bullets.splice(e,1);
		}
	}
}