
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
        me.save.exp = game.data.exp;
        this.gameover = true;
   }
});

