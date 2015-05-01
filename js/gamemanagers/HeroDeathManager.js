game.HeroDeathManager = Object.extend({
    init: function(x, y, settings){
       this.alwaysUpdate = true;

    },
    update: function(){
        //Respawns the player
        if(game.data.player.dead){
            //removes the entity player
            me.game.world.removeChild(game.data.player);
            //removes the miniPlayer entity
            me.game.world.removeChild(game.data.miniPlayer);
            //Resets the character
            me.state.current().resetPlayer(10, 0);
        }
        return true;
    }
});

