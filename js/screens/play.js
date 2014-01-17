game.PlayScreen = me.ScreenObject.extend({
	MAX_ROCKETS: 10,
	rocketCount:0,
	
	onResetEvent: function() {				
		this.rocketCount = 0;
		while(this.rocketCount<this.MAX_ROCKETS){
			this.addRocket();
			this.rocketCount++;
		}		
	},

	init:function(){
		var that = this;
		this.parent(true);		
		me.entityPool.add("rocket", game.RocketEntity,true);
		me.entityPool.add("rocketTarget", game.RocketTargetEntity,true);
		me.entityPool.add("particle", game.ParticleEntity,true);
		
		me.event.subscribe("/rocket/removed",function(e){
			that.addRocket();
		});				
	},
	
	addRocket:function(){
		var y = me.game.viewport.height-4;
		var x = Math.floor(Math.random() * (me.game.viewport.width - 1 + 1)) + 1;		
		var d = new Date().toString();
		var height = me.game.viewport.height/2;
		var widthMax = 0;
		var widthMin = 0;
		if(x<(me.game.viewport.width/2)){
			widthMax = me.game.viewport.width;
			widthMin = me.game.viewport.width/2;
		}else{
			widthMax = me.game.viewport.width/2;
			widthMin = 1;
		}
		var tx = Math.floor(Math.random()*(widthMax-widthMin+1)+widthMin);
		var ty = Math.floor(Math.random()*(height-1+1));
		
		// add new rocket
		var r = me.entityPool.newInstanceOf("rocket",x,y,{image:'empty',spritewidth:16,spriteheight:16,type:d,targetX:tx,targetY:ty});
		me.game.add(r,1000);		
		// rocket does not have livetime instead it has target where to check collision
		var rt = me.entityPool.newInstanceOf("rocketTarget",tx,ty,{image:'empty',spritewidth:16,spriteheight:16,type:d});
		me.game.add(rt,1000);		
	},

	onDestroyEvent: function() {
		me.event.unsubscribe("/rocket/removed");
	},

	update:function(){
		return true;
	},
	draw:function(context){
		me.video.clearSurface(context, "black");
	}
});
