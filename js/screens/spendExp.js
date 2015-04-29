game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO
                
                me.input.bindKey(me.input.KEY.F1, "F1");
                me.input.bindKey(me.input.KEY.F2, "F2");
                me.input.bindKey(me.input.KEY.F3, "F3");
                me.input.bindKey(me.input.KEY.F4, "F4");
                me.input.bindKey(me.input.KEY.F5, "F5");
                
                var exp1cost = ((Number(game.data.exp1) + 1) * 10);
                var exp2cost = ((Number(game.data.exp2) + 1) * 50);
                var exp3cost = ((Number(game.data.exp3) + 1) * 20);
                var exp4cost = ((Number(game.data.exp4) + 1) * 20);
                 
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
                        this.font.draw(renderer.getContext(), "F1: Gold Rate!                                       Current Level: " + game.data.exp1.toString() + " Cost: " + exp1cost, this.pos.x, this.pos.y + 70);
                        this.font.draw(renderer.getContext(), "F2: Free Gold At Start!                          Current Level: " + game.data.exp2.toString() + " Cost: " + exp2cost, this.pos.x, this.pos.y + 120);
                        this.font.draw(renderer.getContext(), "F3: DAMAGE +1!                                  Current Level: " + game.data.exp3.toString() + " Cost: " +  exp3cost, this.pos.x, this.pos.y + 170);
                        this.font.draw(renderer.getContext(), "F4: HEALTH +1!                                    Current Level: " + game.data.exp4.toString() + " Cost: " + exp4cost, this.pos.x, this.pos.y + 220);
                    
                    }
                 
                })));
    
    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
                    if(action === "F1") {
                        if(game.data.exp >= exp1cost) {
                            game.data.exp1 += 1;
                            game.data.exp -= exp1cost;
                            me.state.change(me.state.PLAY);
                        }
                        else {
                            console.log("Not Enough Experience");
                        }
                    }
                    else if(action === "F2") {
                        
                    }
                    else if(action === "F3") {
                        if(game.data.exp >= exp3cost) {
                            game.data.exp3 += 1;
                            game.data.exp -= exp3cost;
                            me.state.change(me.state.PLAY);
                        }
                        else {
                            console.log("Not Enough Experience");
                        }
                    }
                    else if(action === "F4") {
                        
                    }
                    else if(action === "F5") {
                        me.state.change(me.state.PLAY);
                    }
                });
 	
        },
	 
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function(){
            me.input.unbindKey(me.input.KEY.F1, "F1");
            me.input.unbindKey(me.input.KEY.F2, "F2");
            me.input.unbindKey(me.input.KEY.F3, "F3");
            me.input.unbindKey(me.input.KEY.F4, "F4");
            me.input.unbindKey(me.input.KEY.F5, "F5");
            me.event.unsubscribe(this.handler);
	}
});
