game.SpearThrow = me.Entity.extend({
    init: function(x, y, settings, facing) {
        this._super(me.Entity, "init", [x, y, {
            image: "spear",
            width: 48,
            height: 48,
            spritewidth: "48",
            spriteheight: "48",
            getShape: function() {
                return (new me.Rect(0, 0, 48, 48)).toPolygon();
            }
        }]);
        
        console.log("Spear init");
        
        this.alwaysUpdate = true;
        //Sets velocity of the spear
        this.body.setVelocity(8, 0);
        //identifies the type
        this.type = "spear";
        //Sets a facing variable
        this.facing = facing;
        this.attack = game.data.ability3 * 3;
    },
    
    update: function(delta){
        if(this.facing === "left") {
            //runs the animation and shoots the spear
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            //Flips animation
            this.flipX(true);
        }
        else {
            //Shoots the spear to the right
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
         
        me.collision.check(this, true, this.collideHandler.bind(this), true); 
         
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);        
         return true;
    },
    
    collideHandler: function(response) {
        //enables spear to attck the EnemyBase and EnemyCreep
        if(response.b.type === "EnemyBase" || response.b.type === "EnemyCreep") {
            //Gives spear damage
            response.b.loseHealth(this.attack);
            //Removes the entity
            me.game.world.removeChild(this);
        }
     }
});
