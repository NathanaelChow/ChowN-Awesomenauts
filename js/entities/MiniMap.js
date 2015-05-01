game.MiniMap = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, "init", [x, y, {
                image: "minimap-img",
                width: 521,
                height: 174,
                spritewidth: "521",
                spriteheight: "174",
                getShape: function() {
                    return (new me.Rect(0,0,521,174)).toPolygon();
                }
                
        }]);
   
   // Make sure minimap stays where it's suppose to be (follow screen coordinates)
        this.floating = true;

        this.alwaysUpdate = true;
        this.mapping = true;
            
    },
    // Press M key to remove or display minimap
    update: function(){
            
        if(me.input.isKeyPressed("map")){
            if(!this.mapping){
                this.startMinimap();
                    
            }else {
                this.stopMinimap();
            }
                
                
        }
        return true;
    },
    //Display the minimap
    startMinimap: function() {
        this.mapping = true;
        me.game.world.addChild(game.data.minimap, 30);
        me.game.world.addChild(game.data.miniPlayer, 31);
    },
    //Remove the minimap    
    stopMinimap: function() {
        this.mapping = false;
        me.game.world.removeChild(game.data.minimap);
        me.game.world.removeChild(game.data.miniPlayer);
    }

});