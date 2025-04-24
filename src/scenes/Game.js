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
import Coin from '../gameObjects/collectables/Coin.js';
import StaticWall from '../gameObjects/Invisible/StaticWall.js';
import ManaPotion from '../gameObjects/collectables/ManaPotion.js';
import OBJECT_TYPES from "../object_types.js"
import ChestBox from '../gameObjects/Boxes/ChestBox.js';
import HealthPotion from '../gameObjects/collectables/HealthPotion.js';


export class Game extends Phaser.Scene {
    
    /*coinGroup = null
    enemyGroup = null
    healthPotionGroup = null
    manaPotionGroup = null
    collisionGroup = null*/

    constructor() {
        super('Game');
        this.shapeGraphics;
        this.manaPotionCt = 0;
        this.healthPotionCt = 0;
    }
    preload() {
        this.physics.world.setBoundsCollision(false, false, false, false)
        this.coinGroup = new Phaser.GameObjects.Group(this);
        this.enemyGroup = new Phaser.GameObjects.Group(this);
        this.healthPotionGroup = new Phaser.GameObjects.Group(this);
        this.manaPotionGroup = new Phaser.GameObjects.Group(this);
        this.collisionGroup = new Phaser.GameObjects.Group(this);
        this.chestGroup = new Phaser.GameObjects.Group(this)

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
        this.interactButtonText.setVisible(false)
    }

    update() {
        this.updateMap();

        this.player.update();

        this.scoreText.setPosition(this.player.x + 60, this.player.y - 120)
        this.manaPotionText.setPosition(this.scoreText.x - this.scoreText.width, this.player.y - 120)
        this.healthPotionText.setPosition(this.manaPotionText.x - this.healthPotionText.width, this.player.y - 120)

        if (this.player.canInteract) {
            this.interactButtonText.setVisible(true)
            this.interactButtonText.setPosition(this.player.x + 15, this.player.y + 15)
        }
        
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
            fontFamily: 'Arial', fontSize: 10, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })
            .setOrigin(0.5)
            .setDepth(100);

        // Create score text
        this.scoreText = this.add.text(20, 20, '$0', {
            fontFamily: 'Arial', fontSize: 10, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
        })
            .setDepth(100);
        
        this.healthPotionText = this.add.text(40, 20, '0x', {
            fontFamily: 'Arial', fontSize: 10, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
        })
            .setDepth(100);
        
        this.manaPotionText = this.add.text(60, 20, '0x', {
            fontFamily: 'Arial', fontSize: 10, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
        })
            .setDepth(100);

        this.interactButtonText = this.add.text(60, 20, "'e'", {
            fontFamily: 'Arial', fontSize: 10, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
        })
            .setDepth(100);

        // Create game over text
        this.gameOverText = this.add.text(this.scale.width * 0.5, this.scale.height * 0.5, 'Game Over', {
            fontFamily: 'Arial', fontSize: 24, color: '#ffffff',
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

        if (this.wkey) {
            this.upKey = this.wkey
            this.downKey = this.akey
        }
        
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

        let ground_layer = map.createLayer('ground', tileset)
        let onGround_layer = map.createLayer('onGround', tileset)
        let sky_layer = map.createLayer('sky', tileset)

        console.log(map.objects)
        let collisionLayer = map.createLayer('collision', tileset)

        for (let i = 0; i < map.objects.length; i++) {
            console.log(map.objects[i].name)
            switch(map.objects[i].name) {
            case 'collectables':
                console.log('collectable')
                this.initCollectables(map.objects[i].objects)
                break;

            case 'spawnPoint':
                this.player.spawnPoint.x = map.objects[i].objects[0].x
                this.player.spawnPoint.y = map.objects[i].objects[0].y
                this.player.setPosition(map.objects[i].objects[0].x, map.objects[i].objects[0].y)
                break;

            case 'collisionsObject':
                for (let j = 0; j < map.objects[i].objects.length; j++) {
                    let objs_ref =  map.objects[i].objects[j];
                    let collider = new StaticWall(this, objs_ref.x + 8, objs_ref.y + 8, Phaser.Math.RND.uuid(), objs_ref.width, objs_ref.height)
                    
                    collider.alpha = 0
                    collider.setImmovable(true);
                    collider.setSize(objs_ref.width, objs_ref.height)
                    this.physics.add.collider(this.player, collider)
                    
                    console.log(`collider: ${collider.x} , ${collider.y}`)
                    
                }
                break;

            case 'chests':
                for (let j = 0; j < map.objects[i].objects.length; j++) {
                    let obj_ref = map.objects[i].objects[j]

                    if (obj_ref.type == OBJECT_TYPES.MED_WOOD_CHEST) {
                        this.addChest(obj_ref.type, obj_ref.x, obj_ref.y, obj_ref.width, obj_ref.height,)
                    }
                }
                break;

            }
            
        }

        // onGround_layer.setCollision(true)
        // ground_layer.setCollision(true)
        // collisionLayer.setCollision(true)

        // this.physics.add.collider(this.player, onGround_layer)
        // this.physics.add.collider(this.player, collisionLayer)

        const debugGraphics = this.add.graphics().setAlpha(0.75);

        console.log(map)
        console.log(map.layers)
        onGround_layer.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding faces (edges)
          });
        
    }


    initCollectables(objects) {
        for (let i = 0; i < objects.length; i++) {
            let data = objects[i];
            switch (data.type) {
                case OBJECT_TYPES.COIN:
                    this.addCoin(data.x, data.y)
                    break;
                case OBJECT_TYPES.MANA_POTION:
                    this.addManaPotion(data.x, data.y)
                    break;
                case OBJECT_TYPES.HEALTH_POTION:
                    this.addHealthPotion(data.x, data.y)
                    break;
                
            }
        }
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

    addCoin(x, y) {
        console.log('new coin')
        let coin = new Coin(this, x, y, Phaser.Math.RND.uuid(), 1)
        coin.create()
        this.coinGroup.add(coin)
        this.physics.add.overlap(this.player, coin, () => {
            coin.destroy()
            this.updateScore(coin.value)
        }, null, this)
        coin.magnetBox.alpha = 0

        this.physics.add.overlap(this.player, coin.magnetBox, () => {
            let goto_vector = (new Phaser.Math.Vector2(this.player.x, this.player.y))
            .subtract(new Phaser.Math.Vector2(coin.x, coin.y))

            goto_vector.normalize().scale(coin.magnetBox.increment)
            
            coin.setPosition(coin.x + (goto_vector.x), coin.y + (goto_vector.y))
        }, null, this)
    }

    addManaPotion(x,y) {
        console.log('new mana potion')
        let manaPotion = new ManaPotion(this, x, y, Phaser.Math.RND.uuid(), 1)
        manaPotion.create()
        this.manaPotionGroup.add(manaPotion)
        this.physics.add.overlap(this.player, manaPotion, () => {
            manaPotion.destroy()
            this.player.incrementManaPotion(1)
        }, null, this)
        manaPotion.magnetBox.alpha = 0

        this.physics.add.overlap(this.player, manaPotion.magnetBox, () => {
            let goto_vector = (new Phaser.Math.Vector2(this.player.x, this.player.y))
            .subtract(new Phaser.Math.Vector2(manaPotion.x, manaPotion.y))

            goto_vector.normalize().scale(manaPotion.magnetBox.increment)
            
            manaPotion.setPosition(manaPotion.x + (goto_vector.x), manaPotion.y + (goto_vector.y))
        }, null, this)

    }

    addHealthPotion(x,y) {
        console.log('new mana potion')
        let healthPotion = new HealthPotion(this, x, y, Phaser.Math.RND.uuid(), 1)
        healthPotion.create()
        this.healthPotionGroup.add(healthPotion)
        this.physics.add.overlap(this.player, healthPotion, () => {
            healthPotion.destroy()
            this.player.incrementHealthPotion(1)
        }, null, this)

        healthPotion.magnetBox.alpha = 0

        this.physics.add.overlap(this.player, healthPotion.magnetBox, () => {
            let goto_vector = (new Phaser.Math.Vector2(this.player.x, this.player.y))
            .subtract(new Phaser.Math.Vector2(healthPotion.x, healthPotion.y))

            goto_vector.normalize().scale(healthPotion.magnetBox.increment)
            
            healthPotion.setPosition(healthPotion.x + (goto_vector.x), healthPotion.y + (goto_vector.y))
        }, null, this)

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
        this.scoreText.setText(`$${this.score}`);
        this.player.coinCount += points;
    }

    updateHealthPotionCt(points) {
        this.healthPotionCt += points;
        this.healthPotionText.setText(`${this.healthPotionCt}x`);
        this.player.healthPotionCt += points;
    }

    updateManaPotionCt(points) {
        this.manaPotionCt += points;
        this.manaPotionText.setText(`${this.manaPotionCt}x`);
        this.player.manaPotionCt += points;
    }

    GameOver() {
        this.gameStarted = false;
        this.gameOverText.setVisible(true);
    }

    addChest(chestType, x, y, w, h, item) {
        let chest = new ChestBox(this, x, y, w, h, chestType, item)
        
    }

    
}
