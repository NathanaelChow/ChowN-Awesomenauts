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
        if(Math.round(this.now / 1000)%20 === 0 && (this.now - this.lastCreep >= 1000)) {
            game.data.gold += 1;
            game.data.gold += Number(game.data.exp1 + 1);
            console.log("Current Gold: " + game.data.gold);
        }
    },
    //Sets the spawn timer of the enemy creeps
    creepTimerCheck: function(){
        if (Math.round(this.now / 1000) % 10 === 0 && (this.now - this.lastCreep >= 350)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 3000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }

});
