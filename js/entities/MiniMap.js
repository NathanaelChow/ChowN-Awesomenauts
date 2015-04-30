game.MiniMap = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, "init", [x, y, {
                image: "minimap",
                width: 521,
                height: 174,
                spritewidth: "521",
                spriteheight: "174",
                getShape: function() {
                    return (new me.Rect(0,0,521,174)).toPolygon();
                }
                
        }]);
    
        this.floating = true;
        /*
        this.now = new Date().getTime();
        this.lastMap = new Date().getTime();
        this.mapping = true;
        */
    }
  /*
    update: function(){
        this.now = new Date().getTime();
        
        if(me.input.isKeyPressed("map")) {
            this.lastMap = this.now;
            if(!this.mapping) {
                this.mapOn();
            }
            else {
                this.mapOff();
                this.mapping = false;
            }
        }
        return true;
        
    },
    
    mapOn: function() {
        me.game.world.addChild(game.data.minimap, 30);
        me.input.bindKey(me.input.KEY.M, "map", true);  
    },
    
    mapOff: function() {
        me.game.world.removeChild(game.data.minimap);  
    }
    */
});