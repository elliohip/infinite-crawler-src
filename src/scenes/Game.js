/*
* Asset from: https://kenney.nl/assets/pixel-platformer
*
*/
import ASSETS from '../assets.js';
import ANIMATION from '../animation.js';
import Player from '../gameObjects/Player.js';
import PlayerBullet from '../gameObjects/PlayerBullet.js';
import EnemyFlying from '../gameObjects/EnemyFlying.js';
import EnemyBullet from '../gameObjects/EnemyBullet.js';
import Explosion from '../gameObjects/Explosion.js';


export class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }
    preload() {
        
        this.initVariables();
        this.initGameUi();
        this.initAnimations();
        this.initPlayer();
        this.initInput();
        this.initPhysics();
        this.initMap();

        this.player.preload()
        
    }
    create() {
        this.player.create()
        this.cameras.main.startFollow(this.player)

    }

    update() {
        this.updateMap();

        this.player.update();

        // if (this.spawnEnemyCounter > 0) this.spawnEnemyCounter--;
        // else this.addFlyingGroup();

        if (!this.gameStarted) return;
    }

    initVariables() {
        this.score = 0;
        this.centreX = this.scale.width * 0.5;
        this.centreY = this.scale.height * 0.5;

        // list of tile ids in tiles.png
        // items nearer to the beginning of the array have a higher chance of being randomly chosen when using weighted()
        this.tiles = [50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 110, 110, 110, 110, 50, 50, 50, 50, 50, 50, 50, 50, 50, 110, 110, 110, 110, 110, 36, 48, 60, 72, 84];
        this.tileSize = 32; // width and height of a tile in pixels

        this.mapOffset = 10; // offset (in tiles) to move the map above the top of the screen
        this.mapTop = -this.mapOffset * this.tileSize; // offset (in pixels) to move the map above the top of the screen
        this.mapHeight = Math.ceil(this.scale.height / this.tileSize) + this.mapOffset + 1; // height of the tile map (in tiles)
        this.mapWidth = Math.ceil(this.scale.width / this.tileSize); // width of the tile map (in tiles)
        this.scrollSpeed = 1; // background scrolling speed (in pixels)
        this.scrollMovement = 0; // current scroll amount
        this.spawnEnemyCounter = 0; // timer before spawning next group of enemies

        this.map; // rference to tile map
        this.groundLayer; // reference to ground layer of tile map
        
    }

    initGameUi() {
        // Create tutorial text
        this.tutorialText = this.add.text(this.centreX, this.centreY, 'Tap\n(or press space)\nto\nattack and start!', {
            fontFamily: 'publicPixel', fontSize: 14, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100);

        // Create score text
        /*this.scoreText = this.add.text(20, 20, 'Score: 0', {
            fontFamily: 'Arial Black', fontSize: 28, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
        }
            .setDepth(100);
        */

        // Create game over text
        this.gameOverText = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'Game Over', {
            fontFamily: 'publicPixel', fontSize: 24, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100)
            .setVisible(false);
    }

    initAnimations() {
        
        for(let config in ANIMATION) {
            this.anims.create(ANIMATION[config])
        }
    }

    initPhysics() {
        this.enemyGroup = this.add.group();
        this.enemyAttackBoxGroup = this.add.group();
        this.playerAttackBoxGroup = this.add.group();

        this.physics.add.overlap(this.player, this.enemyAttackBoxGroup, this.hitPlayer, null, this);
        this.physics.add.overlap(this.playerAttackBoxGroup, this.enemyGroup, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemyGroup, this.hitPlayer, null, this);
    }

    initPlayer() {
        this.player = new Player(this, this.centreX, this.scale.height - 100, 0);
    }

    initInput() {
        this.wkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.skey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        // check for spacebar press only once
        this.cursors.space.once('down', (key, event) => {
            this.startGame();
        });
    }

    // create tile map data
    initMap() {
        // this.load.tilemapTiledJSON('tilemapJson', 'assets/Levels/tilemap-webgame1.json')
        

        const map = this.make.tilemap({key: ASSETS.tilemapTiledJSON.levels.levelInit.key})
        const tileset = map.addTilesetImage('Dungeon_Tileset', ASSETS.image.levels.levelInit.key)
        

        //map.createLayer(0, tileset)
        //map.createLayer(2, tileset)
        //map.createLayer('ground', tileset)

        // this.add.tilemap(ASSETS.spritesheet.world.tiles.key)
    }
    // scroll the tile map
    updateMap() {
         // move one tile up
    }

    startGame() {
        this.gameStarted = true;
        this.tutorialText.setVisible(false);
        // this.addFlyingGroup();
    }

    fireBullet(x, y) {
        const bullet = new PlayerBullet(this, x, y);
        this.playerAttackBoxGroup.add(bullet);
    }

    removeBullet(bullet) {
        this.playerAttackBoxGroup.remove(bullet, true, true);
    }

    fireEnemyBullet(x, y, power) {
        const bullet = new EnemyBullet(this, x, y, power);
        this.enemyAttackBoxGroup.add(bullet);
    }

    removeEnemyBullet(bullet) {
        this.playerAttackBoxGroup.remove(bullet, true, true);
    }

    // add a group of flying enemiesr

    addEnemy(shipId, pathId, speed, power) {
        const enemy = new EnemyFlying(this, shipId, pathId, speed, power);
        this.enemyGroup.add(enemy);
    }

    removeEnemy(enemy) {
        this.enemyGroup.remove(enemy, true, true);
    }

    addExplosion(x, y) {
        new Explosion(this, x, y);
    }

    hitPlayer(player, obstacle) {
        this.addExplosion(player.x, player.y);
        player.hit(obstacle.getPower());
        obstacle.die();

        this.GameOver();
    }

    hitEnemy(bullet, enemy) {
        this.updateScore(10);
        bullet.remove();
        enemy.hit(bullet.getPower());
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    GameOver() {
        this.gameStarted = false;
        this.gameOverText.setVisible(true);
    }

    
}
