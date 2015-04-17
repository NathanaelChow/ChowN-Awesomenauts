game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
                
                me.game.world.addChild(new(me.Renderable.extend({
                    init: function(){
                        //Sets the x and y cordinates of the text
                        this._super(me.Renderable, 'init', [10, 10, 300, 50]);
                        //Sets the font and color
                        this.font = new me.Font("Arial", 36, "white");
                    },
                    
                    draw: function(renderer){
                        //draws the text
                        this.font.draw(renderer.getContext(), "Press F1-F4 to BUY,F5 to SKIP", this.pos.x, this.pos.y);
                        this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 720, this.pos.y + 540);
                    
                        this.font.draw(renderer.getContext(), "F1: Gold Rate!                                       Current Level: " + game.data.exp1.toString() + " Cost: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 70);
                        this.font.draw(renderer.getContext(), "F2: Free Gold At Start!                          Current Level: " + game.data.exp2.toString() + " Cost: " + ((game.data.exp2 + 1) * 50), this.pos.x, this.pos.y + 120);
                        this.font.draw(renderer.getContext(), "F3: DAMAGE +1!                                  Current Level: " + game.data.exp3.toString() + " Cost: " + ((game.data.exp3 + 1) * 20), this.pos.x, this.pos.y + 170);
                        this.font.draw(renderer.getContext(), "F4: HEALTH +1!                                    Current Level: " + game.data.exp4.toString() + " Cost: " + ((game.data.exp4 + 1) * 20), this.pos.x, this.pos.y + 220);
                    
                    
                    }
                 
                })));
    
        },
	 
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function(){

	}
});
