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

