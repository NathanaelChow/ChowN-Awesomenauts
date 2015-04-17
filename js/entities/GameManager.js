game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    //Sets the timer for gold and creep
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck(); 
        return true;
    },
    //Sets the timer of when gold spawns
    goldTimerCheck: function(){
        if (Math.round(this.now / 1000) % 20 === 0 && (this.now - this.lastCreep >= 500)) {
            game.data.gold += 1;
            console.log("Current gold: " + game.data.gold);
        }
    },
    //Sets the spawn timer of the enemy creeps
    creepTimerCheck: function(){
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 350)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }

});

game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
       this.alwaysUpdate = true;

    },
    update: function(){
        //Respawns the player
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player);//removes the entity
            me.state.current().resetPlayer(10, 0);//Resets the character
        }
        return true;
    }
});

game.ExperienceManager = Object.extend({
   init: function(x, y, settings){
       this.alwaysUpdate = true;
       this.gameover = false;
   },
   
   update: function(){
       if(game.data.win === true && !this.gameover){
           this.gameOver(true);
       }else if(game.data.win === false && !this.gameover){
           this.gameOver(false);
       }
       console.log(game.data.exp);
       
       return true;
   },
   
   gameOver: function(win){
        if(win){//If the player wins it gains 10exp
            game.data.exp += 10;
        }else{//If player loses it gains only 1exp
            game.data.exp += 1; 
        }
      
   }
});