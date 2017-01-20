
var bootState = {
    
    init: function () {
        "use strict";
        this.input.maxPointers = 1;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.setMinMax(48, 26, 1920, 1080);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        
        if (!this.game.device.desktop) {
            this.scale.forceOrientation(true, false);
        }
    },
    
    preload: function () {
        "use strict";
        this.game.load.image('background', 'assets/back.png');
        this.game.load.image('sign', 'assets/sign.png');
        this.game.load.image('bcandy', 'assets/bcandy.png');
        this.game.load.image('rcandy', 'assets/rcandy.png');
        this.game.load.image('pcandy', 'assets/pcandy.png');
        this.game.load.image('border', 'assets/hBorder.png');
        this.game.load.image('bomb', 'assets/bomb100.png');
        this.game.load.image('playButton', 'assets/clickMe.png');
        
    },
    
    create: function () {
        "use strict";
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.game.state.start('main');
    }
};


var game = new Phaser.Game(1600, 900);

game.state.add('boot', bootState);
game.state.add('main', mainState);
game.state.add('end', endState);
            //	Now start the Boot state.
game.state.start('boot', true, false);