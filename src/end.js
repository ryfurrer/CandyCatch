var win, timeBonus, playButton;

var endState = {

    init: function () {
        "use strict";
        game.scale.setGameSize(window.innerWidth, window.innerHeight);
        this.game.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
    },
    
    preload: function () {
        "use strict";
        this.game.stage.backgroundColor = '#fff';
    },
    
    create: function () {
        "use strict";
        var bar = game.add.graphics();
        bar.beginFill(0x1E8F39, 1);
        bar.drawRect(0, 0, window.innerWidth, 50);
        
        var resultStyle = {font: "bold 30px Arial", fill: "#000"}, headingStyle = {font: " 24px Arial", fill: "#000"};
        //var itemStyle = {font: " 18px Arial", fill: "#000"};

        this.game.add.text(100, 150, "Results:", headingStyle);
        this.game.add.text(130, 200, "Score: " + score + "\nBombs hit: " + bombsHit, resultStyle);
        this.playButton = this.add.button(game.width / 2 - 106, 450, 'playButton', this.startGame, this);
        this.game.add.text(game.width / 2 - 28, 462, "Retry", headingStyle);
        
        
    },
    
    startGame: function (pointer) {
        "use strict";
		//	And start the actual game
        this.state.start('main', true, false);

	}
};
