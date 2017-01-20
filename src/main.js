var score, time, timer, scoreText, timeText, bonus, timelimit;
var color, canDraw, combos, fakeCandies;
var borders, candies, signs, board, bombs, bombsHit;


// Create our 'main' state that will contain the game
var mainState = {
    
    init: function () {
        "use strict";
        game.scale.setGameSize(1600, 900);
        this.game.world.setBounds(-100, 0, 1800, 900);
        score = 0;
        bonus = 0;
        timelimit = 0;
        bombsHit = 0;
        combos = 0;
        time = 20;
    },

    create: function () {
        "use strict";
        board = this.game.add.tileSprite(-100, 0, 1800, 900, 'background');
        
        signs = this.game.add.group();
        
        borders = this.game.add.physicsGroup();
        //game.physics.arcade.enable(borders);
        borders.create(0, -5, 'border');
        borders.create(0, 900, 'border');
        borders.setAll('body.immovable', true);
        candies = this.game.add.group();
        fakeCandies = this.game.add.group();
        bombs  = this.game.add.group();
        
        candies.enableBody = true;
        this.game.physics.arcade.enable(candies);
        
        fakeCandies.enableBody = true;
        this.game.physics.arcade.enable(fakeCandies);
        
        bombs.enableBody = true;
        this.game.physics.arcade.enable(bombs);
        
        
        signs.create(40, -55, 'sign');
        signs.create(40, 0, 'sign');
        
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        
        timeText = this.game.add.text(75, 37, "Time: " + time, {font: "20px Arial", fill: "#fff", align: "left"});
        scoreText = this.game.add.text(75, 92, "Score: " + score, {font: "20px Arial", fill: "#fff", align: "left"});

        this.game.time.events.loop(1000, this.updateTimer, this);
        this.game.time.events.add(500, this.createCandies, this);
        //this.game.input.onDown.add(this.clickDown, this);
        this.game.input.onUp.add(this.release, this);
        
        
        color = '#fff';
        canDraw = false;
        
        //game.input.addMoveCallback(this.p, this);
    },
    

    /*p: function (pointer) {

        // console.log(pointer.);
        //console.log(pointer.event);

    },*/

    update: function () {
        "use strict";
        candies.setAll('body.gravity.y', 300);
        candies.setAll('checkWorldBounds', true);
        candies.setAll('outOfBoundsKill', true);
        candies.setAll('inputEnabled', true);
        candies.setAll('body.bounce.y', 1);
        fakeCandies.setAll('body.gravity.y', 300);
        fakeCandies.setAll('checkWorldBounds', true);
        fakeCandies.setAll('outOfBoundsKill', true);
        fakeCandies.setAll('body.bounce.y', 1);
        bombs.setAll('body.gravity.y', 300);
        bombs.setAll('checkWorldBounds', true);
        bombs.setAll('outOfBoundsKill', true);
        bombs.setAll('inputEnabled', true);
        bombs.setAll('body.bounce.y', 0.9);
        
        
        this.game.physics.arcade.collide(fakeCandies, borders);
        this.game.physics.arcade.collide(candies, borders);
        this.game.physics.arcade.collide(bombs, borders);

        // Here we update the game 60 times per second

        scoreText.text = "Score: " + score;
        //this.drawLine();
        
        for (var i = 0;i<candies.length;i++){
                if (candies.getAt(i).input.pointerOver()) {
                    candies.getAt(i).destroy();
                    i--;
                    score += 10;
                    bonus += 5;
                }
        }
        
        for (var i = 0;i<bombs.length;i++){
                if (bombs.getAt(i).input.pointerOver()) {
                    bombs.getAt(i).kill();
                    //i--;
                    score -= 50;
                    if (score < 0) {
                        score = 0;
                    }
                    bonus = 0;
                    bombsHit++;
                    game.camera.flash(0xff0000, 400);
                }
        }
    },
    
    release: function () {
        //this.game.time.events.add(100, this.removeCut, this);
        //canDraw = false;
        if (bonus > 5 && this.game.time.totalElapsedSeconds() < timelimit) {
            score += bonus - 5;
            combos += 1;
        }
        bonus = 0;
    },
 
    updateTimer: function () {
        if (time > 1) {
            time -= 1;
            timeText.text = "Time: "+ time;
        } else {
            this.game.state.start('end', true, false);
        }
        
    },
    
    createCandies: function () {
        var i = Math.floor(Math.random()*3)+1;
        
        for (var t = 0; t < i; t++){
            this.createCandy();
        }
        
        this.game.time.events.add(Math.floor(Math.random()*1000)+800, this.createCandies, this);
    },
    
    
    createCandy: function () {
        
        var col, side, negative;
        var i =Math.random()*10;
        var t = Math.floor(Math.random()*700);
        var s = Math.floor(Math.random()*2);
        
        switch (s) {
            case 0:
                side = -90;
                negative = 1.1;
                break;
            case 1:
                side = 1700;
                negative = -1.1;
                break;
        }
        
        if (i < 1.9) {
            var can = fakeCandies.create(side,t,'bcandy');
        } else if (i < 7) {
            var can = candies.create(side,t,'rcandy');
        } else if (i < 9) {
            var can = fakeCandies.create(side,t,'pcandy');
        } else {
            var can = bombs.create(side,t,'bomb');
        }
                
        
        if (t>=500){
            can.body.velocity.x = negative*(Math.floor(Math.random()*200)+275);
            can.body.velocity.y = Math.floor(Math.random()*100)-425;
        } else if (t >= 300) {
            can.body.velocity.x = negative*(Math.floor(Math.random()*200)+375);
            can.body.velocity.y = -80;
        } else {
            can.body.velocity.x = negative*(Math.floor(Math.random()*200)+300);
        }
        
        can.angle = Math.floor(Math.random()*85);
        
    },
    
    listener: function () {
        score +=20;

    }
};