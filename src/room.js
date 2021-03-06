
var core        = require('./index');
var GameObject  = require('./game-object');

var Room = module.exports = GameObject.extend({

	objects: null,

	init: function() {
		this._super();

		if (Array.isArray(this.objects)) {
			this.objects = this.objects.slice();
		}

		// Call any defined initialize method
		if (typeof this.initialize === 'function') {
			this.initialize.apply(this);
		}
	},

	draw: function() {
		this.objects = this.objects.map(function(def) {
			var obj = new def.type();
			obj.x = def.x;
			obj.y = def.y;

			obj.draw();

			return obj;
		});
	},

	destroy: function() {
		this.objects.forEach(function(obj) {
			if (obj.destroy) {
				obj.destroy();
			}
		});

		this._super();
	}

});

// -------------------------------------------------------------

Room.onExtend = function() {
	this.onExtend = Room.onExtend;
	this.draw = drawStatic;
};

function drawStatic(roomClass) {
	var room = new this();
	room.draw();
	return room;
}
