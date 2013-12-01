(function(root) {
	
	
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	
	var Asteroid = Asteroids.Asteroid = function (pos,vel) {
		Asteroids.MovingObject.call(this, Asteroid.RADIUS, Asteroid.COLOR);
		this.pos = pos;
		this.vel = vel;
	};
	
	Asteroid.COLOR = 'black';
	Asteroid.RADIUS = 25;
	
	Asteroid.inherits(Asteroids.MovingObject);
	
	Asteroid.randomAsteroid = function(dimX, dimY) {
		var x = Math.floor((Math.random()*dimX));
		var y = Math.floor((Math.random()*dimY));
		var pos = [x,y];
		var vel = randomVec();
		
		return new Asteroid(pos,vel);
	}
	
	var randomVec = function() {
		return [(Math.random()*4-2),(Math.random()*4-2)]
	};
})(this);