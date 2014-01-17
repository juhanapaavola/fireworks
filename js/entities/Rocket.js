game.RocketEntity = me.ObjectEntity.extend({

	targetY:0,
	targetX:0,
	targetRect:null,
	rgb:{
		r:0,
		g:0,
		b:0,
		rgb:0
	},
	
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		this.setVelocity(7, 7);
		this.gravity=0;
		this.collidable = false;
		
		this.targetX = settings.targetX;
		this.targetY = settings.targetY;
		this.targetRect = new me.Rect(new me.Vector2d(this.targetX-5,this.targetY-5),10,10);
		this.updateColRect(0,5,0,5);
		var dx = this.targetX-x;
		var dy = this.targetY-y;
		var len = Math.sqrt(dx*dx+dy*dy);
		dx/=len;
		dy/=len;
		
		var speed = Math.floor(Math.random()*(4-1+1)+1);
		this.vel.x = dx*speed;
		this.vel.y = dy*speed;
		
		var r = Math.floor(Math.random()*(255-125+1)+125);
		var g = Math.floor(Math.random()*(255-125+1)+125);
		var b = Math.floor(Math.random()*(255-128+1)+128);
		
		this.rgb.r = r;
		this.rgb.g = g;
		this.rgb.b = b;
		
		r = r.toString(16);
		if(r.length<2){
			r='0'+r;
		}
		g = g.toString(16);
		if(g.length<2){
			g='0'+g;
		}
		b = b.toString(16);
		if(b.length<2){
			b='0'+b;
		}
		this.rgb.rgb = r+g+b;
		
//		console.log("RocketEntity:init: "+this.pos+" vel: "+this.vel+" dx: "+dx+" dy: "+dy+" speed: "+speed+" rgb: "+this.rgb.rgb);
	},

	update:function(){
		var res = this.collideType(this.type);
		if(res){
			me.game.remove(this);
			me.event.publish("/rocket/removed");
			
			// particle explosion			
			var howMany = Math.floor(Math.random()*(360-40+1)+40);
			var waves = Math.floor(Math.random()*(5-0+1)+0);			
			var livetime = Math.floor(Math.random()*(10-1+1)+1);
			var speed = Math.floor(Math.random()*(4-1+1)+2);
			var particleSize = Math.floor(Math.random()*(5-1+1)+1);
			var that = this;
			
			this.addExplosion(howMany,livetime,speed,particleSize);
			for(var i=0;i<waves;i++){
				setTimeout(function(){
					that.addExplosion(howMany,livetime,speed,particleSize);
				},waves*150);
			}
		}else{
			this.updateMovement();			
			this.parent();
			return true;			
		}
		return false;
	},

	addExplosion:function(howMany,livetime,speed,particleSize){
		var step = 360/howMany;				
		for(var i=0;i<howMany;i++){
			var x = 1*Math.cos(step);
			var y = 1*Math.sin(step);
			var target = new me.Vector2d(this.pos.x+x,this.pos.y+y);
			var p1 = me.entityPool.newInstanceOf("particle",this.pos.x,this.pos.y,
				{image:'empty',spriteheight:2,spritewidth:2,live:livetime,dir:target,rgb:this.rgb,speed:speed,size:particleSize}
			);				
			me.game.add(p1,this.z+1);
			step+=360/howMany;					
		}					
	},
	
	draw:function(context){
		context.fillStyle="#"+this.rgb.rgb;
		context.fillRect(this.pos.x,this.pos.y,2,2);
	}
});