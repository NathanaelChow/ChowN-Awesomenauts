game.PlayerEntity=me.Entity.extend({
   init: function(x, y, settings){
     this._super(me.Entity, 'init', [x, y, {
             image: "player",
             width: 63,
             height: 63,
             spritewidth:"63",
             spriteheight:"63",
             getShape: function(){
                 return(new me.Rect(0, 0, 20, 45)).toPolygon();
             }
     }]);
     
     this.body.setVelocity(5,20);
     me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
     
     this.renderable.addAnimation("idle", [0]);
     this.renderable.addAnimation("walk", [1,2,3,4,5,6,7,8], 80);
     
     this.renderable.setCurrentAnimation("idle");
     
 
   },
   
   update: function(delta){
       
        if(me.input.isKeyPressed("right")){
           this.body.vel.x += this.body.accel.x * me.timer.tick;
           this.flipX(false);
       }else{
           this.body.vel.x = 0;
       }
       
        if (me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(true);

        } else {
            this.body.vel.x - 0;
      
        }
       
               if (me.input.isKeyPressed('jump')) {   
    if (!this.body.jumping && !this.body.falling) {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        // set the jumping flag
        this.body.jumping = true;
        // play some audio 
        me.audio.play("jump");
    }
}
       
       
       
        if(this.body.vel.x !== 0){
        if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
                
        }   
    }else{
        this.renderable.setCurrentAnimation("idle");
    }
        
       
       this.body.update(delta);
       
       this._super(me.Entity,"update", [delta])
       
       return true;
   }
    
});

game.PlayerBaseEntity=me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width:100,
                height:100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return(new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "PlayerBaseEntity";
        
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
        }   
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
    
});

game.EnemyBaseEntity=me.Entity.extend({
    init : function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width:100,
                height:100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function(){
                    return(new me.Rect(0, 0, 100, 100)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBaseEntity";
        
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
        }   
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
    
});