game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
                
                
                game.data.option1 = new(me.Renderable.extend({
                    init: function(){
                        //Sets the x and y cordinates of the text
                        this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                        //Sets the font and color
                        this.font = new me.Font("Arial", 46, "white");
                        //Sets the clicking feature of the title
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    draw: function(renderer){
                        //draws the text
                        this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
                    },
                    
                    update: function(dt){
                        return true;
                    },
                    
                    newGame: function(){
                        //runs pointerdown when pointer is unclicked
                        me.input.releasePointerEvent('pointerdown', game.data.option1);
                        me.state.change(me.state.NEW);
                        
                    }
                }));
                //Adds option1
                me.game.world.addChild(game.data.option1);
                
                
                game.data.option2 = new(me.Renderable.extend({
                    init: function(){
                        //Sets the cordinates oof where the text shows up on the screen
                        this._super(me.Renderable, 'init', [380, 340, 250, 50]);
                        //Sets the font, color, andd size
                        this.font = new me.Font("Arial", 46, "white");
                        //Sets the clicking feature to the text
                        me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                    },
                    
                    draw: function(renderer){
                        //Draws the text
                        this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
                    },
                    
                    update: function(dt){
                        return true;
                    },
                    
                    newGame: function(){
                        //runs pointerdown when the pointer is unclicked
                        me.input.releasePointerEvent('pointerdown', game.data.option2);
                        me.state.change(me.state.LOAD);
        }
    }));
                //Adds option2  
                me.game.world.addChild(game.data.option2);
    
       },
		 
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function(){

	}
});
