game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO
                
                document.getElementById("input").style.visibility = "visible";
                document.getElementById("load").style.visibility = "visible";
                
                me.input.unbindKey(me.input.KEY.W);
                me.input.unbindKey(me.input.KEY.A);
                me.input.unbindKey(me.input.KEY.D);
                me.input.unbindKey(me.input.KEY.E);
                me.input.unbindKey(me.input.KEY.F);
                me.input.unbindKey(me.input.KEY.C);
                me.input.unbindKey(me.input.KEY.B);
                
                var exp1cost = ((game.data.exp1 + 1) * 10);
                 
                me.game.world.addChild(new(me.Renderable.extend({
                    init: function(){
                        //Sets the x and y cordinates of the text
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        //Sets the font and color
                        this.font = new me.Font("Arial", 36, "white");
                    },
                    
                    draw: function(renderer){
                        //draws the text
                        this.font.draw(renderer.getContext(), "Enter Username and Password", this.pos.x, this.pos.y);
                    
                    }
                 
                })));
    

 	
        },
	 
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function(){
            document.getElementbyId("input").style.visibility = "hidden";
            document.getElementbyId("load").style.visibility = "hidden";
	}
});
