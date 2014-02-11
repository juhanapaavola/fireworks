game.PlayScreen = me.ScreenObject.extend({
	MAX_ROCKETS: 10,
	
	onResetEvent: function() {				
		this.rocketCount = 0;
		while(this.rocketCount<this.MAX_ROCKETS){
			this.addRocket();
			this.rocketCount++;
		}

		var that = this;
		me.event.subscribe("/rocket/removed",function(e){
			that.addRocket();
		});

		me.game.world.addChild(new me.ColorLayer("background", "#000000", 0), 0);	
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
		var r = me.pool.pull("rocket",x,y,{image:'empty',width:16, height:16,spritewidth:16,spriteheight:16,type:d,targetX:tx,targetY:ty});
		me.game.world.addChild(r,1000);		
		// rocket does not have livetime instead it has target where to check collision
		var rt = me.pool.pull("rocketTarget",tx,ty,{image:'empty',width:16, height:16,spritewidth:16,spriteheight:16,type:d});
		me.game.world.addChild(rt,1000);		
	},

	onDestroyEvent: function() {
		me.event.unsubscribe("/rocket/removed");
	}
});
