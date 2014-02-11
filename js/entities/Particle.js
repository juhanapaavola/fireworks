game.ParticleEntity = me.ObjectEntity.extend({

	rgb:null,
	live: 0,
	target: null,
	speed: 0,
	size:1,
	
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.setVelocity(4, 4);
		this.gravity=0;
		this.collidable = false;
		this.color = new me.Color(settings.rgb.r, settings.rgb.g, settings.rgb.b, 1);
		this.target = settings.dir;
		this.live = settings.live*10; // livetime between 10-1, opacity from 1.0->0 by 0.1 steps = x*10
		this.speed = settings.speed;
		this.size = settings.size;
		
		var dx = this.target.x-x;
		var dy = this.target.y-y;
		var len = Math.sqrt(dx*dx+dy*dy);
		dx/=len;
		dy/=len;
		this.vel.x = dx*this.speed;
		this.vel.y = dy*this.speed;

		this.cacheColor = this.color.toRGBA();
		
		this.fade();		
//		console.log("ParticleEntity:init: "+this.pos+" vel: "+this.vel+" dx: "+dx+" dy: "+dy+" speed: "+this.speed+" rgb: "+this.rgb.rgb);		
	},

	fade:function(){
		var that = this;
		var opa = this.color.alpha;
		if(opa>0.1){
			setTimeout(function(){
				opa-=0.1;
				that.color.alpha = opa;
				that.cacheColor = that.color.toRGBA();
				that.fade();			
			},that.live);							
		}else{
			me.game.world.removeChild(this);			
		}		
	},
	
	update:function(){
		this.updateMovement();
		return false;
	},
	
	draw:function(ctx){		
		ctx.fillStyle=this.cacheColor;
		ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size);
	}
});