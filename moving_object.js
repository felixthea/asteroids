(function(root) {
	Function.prototype.inherits = function(superClass) {
		function Surrogate () {};
		Surrogate.prototype = superClass.prototype;
		this.prototype = new Surrogate();
	}
	
	var Asteroids = root.Asteroids = (root.Asteroids || {});
	
	var MovingObject = Asteroids.MovingObject = function(radius, color) {
		this.pos = [0,0];
		this.vel = [1,1];
		this.radius = radius;
		this.color = color;
	};
	
	MovingObject.prototype.move = function() {
		var newX = this.pos[0] + this.vel[0];
		var newY = this.pos[1] + this.vel[1];
		
		this.pos = [newX,newY];
	};
	
	MovingObject.prototype.draw = function(ctx) {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		
		ctx.arc(
			this.pos[0],
			this.pos[1],
			this.radius,
			0,
			2 * Math.PI,
			false
		);
		
		ctx.fill();
	};
	
	MovingObject.prototype.isCollidedWith = function(otherObject) {
		var thisX = this.pos[0];
		var thisY = this.pos[1];
		var thisR = this.radius;
		var otherX = otherObject.pos[0];
		var otherY = otherObject.pos[1];
		var otherR = otherObject.radius;
		
		var dist = Math.sqrt( ( Math.pow( (otherX-thisX), 2 ) ) + ( Math.pow( (otherY-thisY), 2 ) ) );
		
		if ((thisR+otherR) > dist) {
			return true;
		} else {
			return false;
		};
	};
	
	MovingObject.prototype.offMap = function() {
		var object = this;
		if((object.pos[0] > 1000) || (object.pos[0] < 0) || (object.pos[1] > 1000) || (object.pos[1] < 0)) {
			return true;
		} else {
			return false;
		}
	}
	
})(this)