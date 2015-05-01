game.SpendGold = Object.extend ({
    init: function(x, y, settings){
        this.now = new Date().getTime();
        this.lastBuy = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
        this.updateWhenPaused = true;
        this.buying = false;
    },
    
    update: function(){
        this.now = new Date().getTime();
        //if key is pressed it opens up the buy screen
        if(me.input.isKeyPressed("buy") && this.now - this.lastBuy >= 1000) {
            this.lastBuy = this.now;
            if(!this.buying) {
                this.startBuying();
            }
            else {
            //else stop buy screen
                this.stopBuying();
            }
        }
        this.checkBuyKeys();
        
        return true;
    },
    
        startBuying: function() {
        this.buying = true;
        me.state.pause(me.state.PLAY);
        game.data.pausePos = me.game.viewport.localToWorld(0, 0);
        game.data.buyscreen = new me.Sprite(game.data.pausePos.x , game.data.pausePos.y, me.loader.getImage("gold-screen"));
        game.data.buyscreen.updateWhenPaused = true;
        //sets the background screen to be slightly see through
        game.data.buyscreen.setOpacity(0.8);
        //adds the screen entity
        me.game.world.addChild(game.data.buyscreen, 34);
        //Pauses the movement during buy screen
        game.data.player.body.setVelocity(0, 0);
     
        //binds F1-F6 keys
        me.state.pause(me.state.PLAY);      
        me.input.bindKey(me.input.KEY.F1, "F1", true);
        me.input.bindKey(me.input.KEY.F2, "F2", true);
        me.input.bindKey(me.input.KEY.F3, "F3", true);
        me.input.bindKey(me.input.KEY.F4, "F4", true);
        me.input.bindKey(me.input.KEY.F5, "F5", true);
        me.input.bindKey(me.input.KEY.F6, "F6", true);
        
        this.setBuyText();
         
    },
    
        setBuyText: function() {
        game.data.buytext = new (me.Renderable.extend({
            init: function() {
                //Writes the text
                this._super(me.Renderable, "init", [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
                this.font = new me.Font("Arial", 36, "white");
                this.updateWhenPaused = true;
                this.alwaysUpdate = true;
            },
            //Writes the skills and abilities         
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PRESS F1-F6 TO BUY, B TO EXIT.", this.pos.x, this.pos.y);
                this.font.draw(renderer.getContext(), "F1 Skill 1: DAMAGE +1!                      Current Level: " + game.data.skill1 + "  Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 70);
                this.font.draw(renderer.getContext(), "F2 Skill 2: SPEED +1!                         Current Level: " + game.data.skill2 + "  Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 120);
                this.font.draw(renderer.getContext(), "F3 Skill 3: HEALTH +1!                       Current Level: " + game.data.skill3 + "  Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 170);
                this.font.draw(renderer.getContext(), "F4 (E) Ability: Speed Burst!                  Current Level: " + game.data.ability1 + "  Cost: " + ((game.data.ability1+1)*20), this.pos.x, this.pos.y + 220);
                this.font.draw(renderer.getContext(), "F5 (F) Ability: Absorbtion!                    Current Level: " + game.data.ability2 + "  Cost: " + ((game.data.ability2+1)*20), this.pos.x, this.pos.y + 270);
                this.font.draw(renderer.getContext(), "F6 (C) Ability: Spear Throw!                Current Level: " + game.data.ability3 + "  Cost: " + ((game.data.ability3+1)*30), this.pos.x, this.pos.y + 320);

                this.font.draw(renderer.getContext(), "CURRENT GOLD: " + game.data.gold + "", this.pos.x + 720, this.pos.y + 540);
                
           }
        }));
        //Adds buytext
        me.game.world.addChild(game.data.buytext, 35);
    },
    
        stopBuying: function() {
        //stops buying
        this.buying = false;
        //Resumes game
        me.state.resume(me.state.PLAY);
        //Turns off buy screen
        me.game.world.removeChild(game.data.buyscreen);
        //Resets walking velocity
        game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
        
        //Unbinds all the keys
        me.input.unbindKey(me.input.KEY.F1, "F1", true);
        me.input.unbindKey(me.input.KEY.F2, "F2", true);
        me.input.unbindKey(me.input.KEY.F3, "F3", true);
        me.input.unbindKey(me.input.KEY.F4, "F4", true);
        me.input.unbindKey(me.input.KEY.F5, "F5", true);
        me.input.unbindKey(me.input.KEY.F6, "F6", true);
        me.game.world.removeChild(game.data.buytext);
        
    },
        //Checks if a purchase is made
        checkBuyKeys: function() {
        if(me.input.isKeyPressed("F1")) {
            if(this.checkCost(1)){
                this.makePurchase(1);
            }
        }
        else if(me.input.isKeyPressed("F2")) {
            if(this.checkCost(2)){
                this.makePurchase(2);
            }
        }
        else if(me.input.isKeyPressed("F3")) {
            if(this.checkCost(3)){
                this.makePurchase(3);
            }
        }
        else if(me.input.isKeyPressed("F4")) {
           if(this.checkCost(4)){
                this.makePurchase(4);
            }
        }
        else if(me.input.isKeyPressed("F5")) {
            if(this.checkCost(5)){
                this.makePurchase(5);
            }
        }
        else if(me.input.isKeyPressed("F6")) {
            if(this.checkCost(6)){
                this.makePurchase(6);
            }
        }
                    
                
        },
        
        checkCost: function(skill){
         //if skill level is 1 and gold is greater or equal to then add 1 level to the skill  
        if(skill === 1 && (game.data.gold >= ((game.data.skill1 + 1) * 10))) {
            return true;
        }
        //if skill level is 2 and gold is greater or equal to then add 1 level to the skill
        else if(skill === 2 && (game.data.gold >= ((game.data.skill2 + 1) * 10))) {
            return true;
        }//if skill level is 3 and gold is greater or equal to then add 1 level to the skill
        else if(skill === 3 && (game.data.gold >= ((game.data.skill3 + 1) * 10))) {
            return true;
        }
        //if ability level is 4 and gold is greater or equal to then add 1 level to the ability
        else if(skill === 4 && (game.data.gold >= ((game.data.ability1 + 1) * 20))) {
            return true;
        }
        //if ability level is 5 and gold is greater or equal to then add 1 level to the ability
        else if(skill === 5 && (game.data.gold >= ((game.data.ability2 + 1) * 20))) {
            return true;
        }
        //if ability level is 6 and gold is greater or equal to then add 1 level to the ability
        else if(skill === 6 && (game.data.gold >= ((game.data.ability3 + 1) * 30))) {
            return true;
        }
        else {
            return false;
        }
    },
         
         makePurchase: function(skill){
        if(skill === 1) {
            //Consumes stated amount of gold
            game.data.gold -= (game.data.skill1 + 1) * 10;
            game.data.skill1 += 1;
            //Adds 1 to the attack of the pllayer
            game.data.playerAttack += 1;
        }
        else if(skill === 2) {
            //Consumes stated amount of gold
            game.data.gold -= (game.data.skill2 + 1) * 10;
            game.data.skill2 += 1;
            //Adds 1 speed to the velocity of the player
            game.data.player.body.setVelocity += 1;
        }
        else if(skill === 3) {
            //Consumes stated amount of gold
            game.data.gold -= (game.data.skill3 + 1) * 10;
            game.data.skill3 += 1;
            //Adds 1 health point to the max hp of the player
            game.data.player.health += 1;
        }
        else if(skill === 4) {
            //Consumes stated amount of gold
            game.data.gold -= (game.data.ability1 + 1) * 20;
            game.data.ability1 += 1;
        }
        else if(skill === 5) {
            //Consumes stated amount of gold
            game.data.gold -= (game.data.ability2 + 1) * 20;
            game.data.ability2 += 1;
        }
        else if(skill === 6) {
            //Consumes stated amount of gold
            game.data.gold -= (game.data.ability3 + 1) * 30;
            //Gives the ability to throw spears
            game.data.ability3 += 1;
        }
         
       }
});