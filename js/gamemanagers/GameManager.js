    game.ExperienceManager = Object.extend({
    init: function(x, y, settings) {
        this.alwaysUpdate = true;
        this.gameover = false;
    },
    update: function() {
        //if win is true and its gameover you win
        if (game.data.win === true && !this.gameover) {
            this.gameOver(true);
            alert("YOU WIN");
         //if win is false and its gameover you lose
        } else if (game.data.win === false && !this.gameover) {
            this.gameOver(false);
            alert("YOU LOSE");
        }
        console.log(game.data.exp);

        return true;
    },
    gameOver: function(win) {
        if (win) {//If the player wins it gains 10exp
            game.data.exp += 10;
        } else {//If player loses it gains only 1exp
            game.data.exp += 1;
        }
        //saves the exp
        me.save.exp = game.data.exp;
        this.gameover = true;

        //Saves user data
        $.ajax({
            type: "POST",
            url: "php/controller/save-user.php",
            data: {
                exp: game.data.exp,
                exp1: game.data.exp1,
                exp2: game.data.exp2,
                exp3: game.data.exp3,
                exp4: game.data.exp4
            },
            dataType: "text"
        })
                .success(function(response) {
                    if (response === "true") {
                        me.state.change(me.state.MENU);
                    }
                    else {
                        alert(response);
                    }
                })
                .fail(function(response) {
                    alert("Fail");
                });

    }
});