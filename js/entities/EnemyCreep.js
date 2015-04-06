game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 32,
                height: 64,
                spritewidth: "32",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 20, 45)).toPolygon();
                }
            }]);
        //this.health shows us the starting health of the entity
        this.health = game.data.enemyCreepHealth;
        //this.alwaysUpdate constantly updates the game
        this.alwaysUpdate = true;
        //this.attacking tells us if the enemy is attacking
        this.attacking = false;
        //Shows us when the enemy creep last attacked something
        this.lastAttacking = new Date().getTime();
        //Shows us when the creep last hit something
        this.lastHit = new Date().getTime();

        this.now = new Date().getTime();
        //this sets the speed or velocity of the EnemyCreep
        this.body.setVelocity(game.data.creepMoveSpeed, 10);

        this.type = "EnemyCreep";
        //Sets the animation of the EmenyCreep
        this.renderable.addAnimation("walk", [3, 4, 5], 80);
        //Sets the animation to "walk"
        this.renderable.setCurrentAnimation("walk");
    },
    loseHealth: function(damage) {
        this.health = this.health - damage;
        console.log(this.health);

    },
    update: function(delta) {
        if (this.health <= 0) {
            me.game.world.removeChild(this);
        }

        this.now = new Date().getTime();

        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collideHandler.bind(this), true);

        this.body.update(delta);


        this._super(me.Entity, "update", [delta]);

        return true;
    },
    collideHandler: function(response) {
        if (response.b.type === 'PlayerBase') {
            this.attacking = true;
            this.lastAttacking = this.now;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if ((this.now - this.lastHit >= 1000)) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        } else if (response.b.type === 'PlayerEntity') {
            var xdif = this.pos.x - response.b.pos.x;

            this.attacking = true;
            this.lastAttacking = this.now;

            if (xdif > 0) {
                this.pos.x = this.pos.x + 1;
                this.body.vel.x = 0;

            }
            if ((this.now - this.lastHit >= 1000) && xdif > 0) {
                this.lastHit = this.now;
                response.b.loseHealth(game.data.enemyCreepAttack);
            }
        }
    }

});
