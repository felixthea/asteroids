(function(root){
	var Asteroids = root.Asteroids = (root.Asteroids || {});

	var Game = Asteroids.Game = function(ctx) {
		this.ctx = ctx;
		this.asteroids = [];
		this.addAsteroids(10);
		this.ship = new Asteroids.Ship();
		Asteroids.MovingObject.call(this.ship, this.ship.radius, 
			this.ship.color);
		this.ship.pos = [Game.DIM_X/2,Game.DIM_Y/2];
		this.currentInterval = 0;
		this.bullets = [];
	};
	
	Game.DIM_X = 1000;
	Game.DIM_Y = 1000;
	Game.FPS = 30;
	
	Game.prototype.addAsteroids = function(numAsteroids) {
		for(var i = 0; i < numAsteroids; i++) {
			this.asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
		};
	};
	
	Game.prototype.draw = function() {
		var asteroidsLength = this.asteroids.length;
		var game = this;
		var bullets = game.bullets;
		game.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		
		for(var i = 0; i < asteroidsLength; i++) {
			game.asteroids[i].draw(game.ctx);
		};
		
		bullets.forEach(function(bullet) {
			bullet.draw(game.ctx);
		})
		
		game.ship.draw(game.ctx);
	};
	
	Game.prototype.move = function() {
		var asteroidsLength = this.asteroids.length;
		var asteroids = this.asteroids;
		var bullets = this.bullets;
		
		for(var i = 0; i< asteroidsLength; i++) {
			asteroids[i].move();
		};
		
		bullets.forEach(function(bullet) {
			bullet.move();
		})
		
		this.ship.move();
	};
	
	Game.prototype.step = function() {
		this.move();
		this.checkCollisions();
		this.checkAsteroids();
		this.isOutOfBounds();
		this.draw();
	};
	
	Game.prototype.start = function() {
		var that = this;
		this.bindKeyHandlers();
		this.currentInterval = window.setInterval(function() {
			that.step();
		}, Game.FPS);
	};
	
	Game.prototype.checkCollisions = function() {
		var ship = this.ship;
		var game = this;
		this.asteroids.forEach(function(asteroid) {
			if(ship.isCollidedWith(asteroid)) {
				alert("Game Over!");
				game.stop();
			}
			
		});
	};
	
	Game.prototype.stop = function() {
		window.clearInterval(this.currentInterval);
	};
	
	Game.prototype.checkAsteroids = function() {
		var asteroids = this.asteroids;
		var game = this;
		asteroids.forEach(function(asteroid) {
			if(asteroid.pos[0] > Game.DIM_X || asteroid.pos[0] < 0 || asteroid.pos[1] > Game.DIM_Y || asteroid.pos[1] < 0) {
				game.removeAsteroid(asteroid);
			}
		});
	};
	
	Game.prototype.removeAsteroid = function(asteroid) {
		this.asteroids.splice(this.asteroids.indexOf(asteroid),1);
	};
	
	Game.prototype.removeBullet = function(bullet) {
		this.bullets.splice(this.bullets.indexOf(bullet), 1);
	};
	
	Game.prototype.resetShip = function() {
		this.ship.pos = [500,500];
	}
	
	Game.prototype.bindKeyHandlers = function() {
		var ship = this.ship;
		var game = this;
		key("a", function() { ship.power([-1,0]); });
		key("s", function() { ship.power([0,1]); });
		key("w", function() { ship.power([0,-1]); });
		key("d", function() { ship.power([1,0]); });
		key("f", function() { game.fireBullet(); });
	};
	
	Game.prototype.fireBullet = function() {
		var ship = this.ship;
		var game = this;
		
		game.bullets.push(ship.fireBullet(game));
	};
	
	Game.prototype.isOutOfBounds = function () {
		var game = this;
		var asteroids = this.asteroids;
		var bullets = this.bullets;
		var ship = this.ship;
		
		asteroids.forEach(function(asteroid) {
			if(asteroid.offMap()) {
				game.removeAsteroid(asteroid);
			}
		});
		
		bullets.forEach(function(bullet) {
			if(bullet.offMap()) {
				game.removeBullet(bullet);
			}
		});
		
		if(ship.offMap()) {
			game.resetShip();
		};
	};
})(this);