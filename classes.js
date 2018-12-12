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

class Player {
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

class Bullet {
	constructor(x,y,vx,vy) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
	}

	show() {
		ctx.fillRect(this.x - Game.camera.x,this.y  - Game.camera.y,20,20);
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;
	}
}

class Enemy {
	constructor(x,y,health) {
		this.x = x;
		this.y = y;
		this.health = health;
	}

	update() {
		var angle = Math.atan2(player.y - this.y , player.x - this.x);
		var evx = Math.cos(angle);
		var evy = Math.sin(angle);
		this.x += evx * 3;
		this.y += evy * 3;
		console.log(evx,evy)
	}

	show() {
		ctx.fillRect(this.x - Game.camera.x,this.y  - Game.camera.y,40,40);
	}
}