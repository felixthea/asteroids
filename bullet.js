(function(root) {
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	
	Function.prototype.inherits = function(superClass) {
		function Surrogate () {};
		Surrogate.prototype = superClass.prototype;
		this.prototype = new Surrogate();
	}
	
	var Bullet = Asteroids.Bullet = function(game) {
		Asteroids.MovingObject.call(this, Bullet.RADIUS, Bullet.COLOR);
		this.game = game;
	};
	
	Bullet.inherits(Asteroids.MovingObject);
	
	Bullet.RADIUS = 5;
	Bullet.COLOR = 'black'
	Bullet.SPEED = 10;
	
	Bullet.prototype.hitAsteroids = function() {
		var bullet = this;
		var game = bullet.game;
		var asteroids = game.asteroids;
		
		asteroids.forEach(function(asteroid) {
			if(bullet.isCollidedWith(asteroid)) {
				game.removeAsteroid(asteroid);
				game.removeBullet(bullet);
			};
		})
	};
	
	Bullet.prototype.move = function() {
		var bullet = this;
		
		Asteroids.MovingObject.prototype.move.call(this);
		bullet.hitAsteroids();
	};
	
})(this)