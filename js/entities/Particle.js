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
		this.rgb = settings.rgb;
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
		
		this.rgb.opacity = 1;
		this.fade();		
//		console.log("ParticleEntity:init: "+this.pos+" vel: "+this.vel+" dx: "+dx+" dy: "+dy+" speed: "+this.speed+" rgb: "+this.rgb.rgb);		
	},

	fade:function(){
		var that = this;
		var opa = this.rgb.opacity;
		if(opa>0.1){
			setTimeout(function(){
				opa-=0.1;
				that.rgb.opacity = opa;
				that.fade();			
			},that.live);							
		}else{
			me.game.remove(this);			
		}		
	},
	
	update:function(){
		this.updateMovement();
		return false;
	},
	
	draw:function(ctx){		
		ctx.fillStyle='rgba('+this.rgb.r+','+this.rgb.g+','+this.rgb.b+','+this.rgb.opacity+')';
		ctx.fillRect(this.pos.x,this.pos.y,this.size,this.size);
	}
});