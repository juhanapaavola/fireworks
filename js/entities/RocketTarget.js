game.RocketTargetEntity = me.ObjectEntity.extend({

	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.setVelocity(0, 0);
		this.gravity=0;
		this.collidable = true;
	},

	update:function(){
		return false;
	}
});