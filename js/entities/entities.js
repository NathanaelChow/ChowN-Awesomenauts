game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper();
        this.setPlayerTimers();
        this.setAttributes();
        this.setFlags();

        this.type = "PlayerEntity";

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimation();
//this adds an animation


        this.renderable.setCurrentAnimation("idle");

    },
//Tells the size of the animation frames
    setSuper: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 20, 45)).toPolygon();
                }
            }]);
    },
    //Sets the attack and hit timer for the player
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;//Hit timer
        this.lastSpear + this.now;//Spear timer
        this.lastAttack = new Date().getTime();//Attack timer
    },
    //Sets the health, movespeed and attack of the player
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;
    },
    setFlags: function() {
        this.facing = "right";
        this.dead = false;
        this.attacking = false; 
    },
    //Sets the animation for idle, walk, and attack
    addAnimation: function() {
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 120);
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },
    //This sets the player to lose health from its initial hp
    loseHealth: function(damage) {
        this.health = this.health - damage;
        console.log(this.health);
    },
    //Sets all the update to the player entity
    update: function(delta) {
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    //Checks if the player entity is dead(hp is 0)
    checkIfDead: function() {
        if (this.health <= 0) {
            return true;
        }
        return false;
    },
    //Checks if the player is going right, left, and up
    checkKeyPressesAndMove: function() {
        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        } else {
            this.body.vel.x = 0;
        }
        if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        } else {
            this.body.vel.x - 0;
        }

        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                this.jump();
            }
        }

        this.attacking = me.input.isKeyPressed("attack");
    },
    //sets the moving right
    moveRight: function() {
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        this.facing = "right";
        this.flipX(true);
    },
    //sets the moving left
    moveLeft: function() {
        this.facing = "left";
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.flipX(false);
    },
    jump: function() {
        // set current vel to the maximum defined value
        // gravity will then do the rest
        this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
        // set the jumping flag
        this.body.jumping = true;
    },
    checkAbilityKeys: function() {
        if (me.input.isKeyPressed("skill1")) {
            //this.speedBurst();
        } else if (me.input.isKeyPressed("skill2")) {
            //this.Absorbtion();
        } else if (me.input.isKeyPressed("ability3")) {
            console.log("ability3");
            this.throwSpear();
        }
    },
    throwSpear: function() {
        //if ((this.now-this.lastSpear)>= game.data.spearTimer*1000 && game.data.ability3 > 0) {
        if (game.data.ability3 > 0) {
            this.lastSpear = this.now;
            var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
            me.game.world.addChild(spear, 10);
        }
    },
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //Sets "attack" animation then back to "idle"
                this.renderable.setCurrentAnimation("attack", "idle");
                //Next time the sequence is started we begin from the first animation,not wherever we left off
                //when we switched animation
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    //Sets the collision to the enemy creeps and base
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            this.collideWithEnemyBase(response);
        } else if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemyCreep(response);
        }
    },
    collideWithEnemyBase: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;

        if (ydif < -32 && xdif < 70 && xdif > -35) {
            this.body.falling = false;
            this.body.vel.y = -1;
        }
        else if (xdif > -5 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
        } else if (xdif < 85 && this.facing === 'left' && (xdif > 0)) {
            this.body.vel.x = 0;
        }
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    collideWithEnemyCreep: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        this.stopMovement(xdif);

        if (this.checkAttack(xdif, ydif)) {
            this.hitCreep(response);
        }
        ;

    },
    stopMovement: function(xdif) {
        if (xdif > 0) {
            if (this.facing === "left") {
                this.body.vel.x = 0;
            }
        } else {
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    checkAttack: function(xdif, ydif) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            this.lastHit = this.now;
            //if the creeps health is less than our attack, execute code in if statement
            return true;
        }
        return false;
    },
    hitCreep: function(response) {
        if (response.b.health <= game.data.playerAttack) {
            //adds gold per creep kill 
            game.data.gold += 1;
            console.log("Current gold: " + game.data.gold);
            game.data.exp += 1;
            console.log("Current exp: " + game.data.exp);
        }
        response.b.loseHealth(game.data.playerAttack);
    }
});

