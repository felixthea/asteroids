(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	
	var Ship = Asteroids.Ship = function() {
		this.radius = Ship.RADIUS;
		this.color = Ship.COLOR;
	};
	
	Ship.inherits(Asteroids.MovingObject);
	
	Ship.RADIUS = 50;
	Ship.COLOR = 'green'
	
	Ship.prototype.power = function(impulse) {
		var newX = this.vel[0] + impulse[0];
		var newY = this.vel[1] + impulse[1];
		this.vel = [newX, newY];
	};
	
	Ship.prototype.fireBullet = function (game) {
		var speed;
		var vel = this.vel;
		var direction;
		var bullet;
		var ship = this;
		
		if(vel !== [0,0]) {
			speed = Math.sqrt(Math.pow(vel[0],2) + Math.pow(vel[1],2));
			console.log("direction x: " + vel[0]/speed);
			console.log("direction y: " + vel[1]/speed);
			directionX = vel[0]/speed;
			directionY = vel[1]/speed;
			
			bullet = new Asteroids.Bullet(game);
			bullet.pos = ship.pos;
			bullet.vel = [vel[0]+(directionX*Asteroids.Bullet.SPEED),vel[1]+(directionY*Asteroids.Bullet.SPEED)];
			return bullet;
		}
	}
	
})(this);