import ASSETS from '../assets.js';
import ANIMATION from '../animation.js'
import StateMachine from './State/StateMachine.js'
import STATES from '../States.js'
import Phaser from 'phaser'
import PlayerIdleState from "./State/States/Player/PlayerIdleState.js"
import PlayerWalkState from "./State/States/Player/PlayerWalkState.js"
import config from '../../config.js';
import PlayerAttackState from './State/States/Player/PlayerAttackState.js';
import Entity from './Entity.js';


export default class Player extends Entity {
    velocityIncrement = config.player.speedDelta;
    velocityMax = config.player.maxSpeed;
    drag = config.baseDrag;
    attackRate = config.player.attackRate;
    attackCounter = 0;
    health = config.player.initHealth;
    statemachine = null;
    inputVector = new Phaser.Math.Vector2(0,0)
    direction = 'right'
    axisVector = new Phaser.Math.Vector2(0,0)
    isAttacking = false
    coinCount = 0
    spawnPoint = new Phaser.Math.Vector2(0,0)
    healthPotionCt = 0
    manaPotionCt = 0
    current_mana = 100
    max_mana = 100
    canInteract = false

    constructor(scene, x, y, spriteId) {
        super(scene, x, y, ASSETS.spritesheet.player.player_idle.key, spriteId);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.manaRechargeFrequency = 3 * 1000
        this.manaRechargeIncrement = 1
        
        
        setInterval(this.manaRechargeCallback, this.manaRechargeFrequency)
        


        // this.setCollideWorldBounds(true); // prevent ship from leaving the screen
        this.body.width = 7
        this.body.height = 14
        this.setOffset(11, 14)
        // console.log(`${this.body.x}, ${this.body.y}`)
        this.setDepth(1); // make ship appear on top of other game objects
        this.scene = scene;
        this.setMaxVelocity(this.velocityMax); // limit maximum speed of ship
        this.setDrag(this.drag);
        this.statemachine = new StateMachine(Phaser.Math.RND.uuid())
        
    }

    manaRechargeCallback() {
        this.current_mana += this.manaRechargeIncrement
        if (this.current_mana > this.max_mana) {
            this.current_mana = this.max_mana
        }
    }
    updateMana(val) {
        this.current_mana += val
        if (this.current_mana > this.max_mana) {
            this.current_mana = this.max_mana
        }
    }
    load_animation(animation_config, asset_config) {
        return this.anims.create({
            key: animation_config.key,
            frames: this.anims.generateFrameNames(asset_config.key, {
                start: animation_config.config.start,
                end: animation_config.config.end,
                
            }),
            frameRate: animation_config.frameRate
        })
    }


    preload() {
        //this.body.x = this.body.x - 20
        //this.body.y = this.body.y - 20
        this.createAnimations()
        
        let idlestate = new PlayerIdleState(this)
        let walkstate = new PlayerWalkState(this)
        let attackstate = new PlayerAttackState(this)

        this.statemachine.addState(idlestate)
        this.statemachine.addState(walkstate)
        this.statemachine.addState(attackstate)


        this.statemachine.setState(STATES.player.PLAYER_IDLE)
        if (config.mode == 'dev' && config.logging == true) {
            console.log(this.anims.getName())
            console.log(this.statemachine.states)
        }
    }

    create() {
        super.create()
        console.log("player create")
    }

    update() {
        
        this.statemachine.update()
        if (this.direction == 'left'){
            this.setOffset(15, 14)
        }
        else {
            this.setOffset(11, 14)
        }
        // console.log(`${this.body.x}, ${this.body.y}`)
    }

    setPosition(x, y, z, w) {
        
        super.setPosition(x, y, z, w)

        if (this.position != null) {
            this.position.x = x;
            this.position.y = y;
        }
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        
        
        if (this.attackCounter > 0) this.attackCounter--;

        this.checkInput();
    }

    checkLeft(cursors) {

        return this.scene.akey.isDown
        
    }

    checkRight(cursors) {
        return this.scene.dkey.isDown
        
    }

    checkDown(cursors) {
        
        return this.scene.skey.isDown
        
    }
    checkUp(cursors) {

        return this.scene.wkey.isDown

    }

    checkInput() {
        if (this.isAttacking) return;

        const cursors = this.scene.cursors; // get cursors object from Game scene
        const leftKey = this.checkLeft(cursors);
        const rightKey = this.checkRight(cursors);
        const upKey = this.checkUp(cursors);
        const downKey = this.checkDown(cursors);
        const spaceKey = cursors.space.isDown;

        const moveDirection = { x: 0, y: 0 }; // default move direction

        if (leftKey) moveDirection.x--;
        if (rightKey) moveDirection.x++;
        if (upKey) moveDirection.y--;
        if (downKey) moveDirection.y++;
        if (spaceKey) { this.attack(); return }


        if (this.inputVector != null || !this.isAttacking){ 
            this.inputVector.x = moveDirection.x
            this.inputVector.y = moveDirection.y

            this.inputVector.normalize()
            // this.inputVector.lerp()
            
            if (this.inputVector.x < 0 && this.direction == 'right') {
                this.setFlipX(true)
                this.direction = 'left'
            } 
            else if (this.inputVector.x > 0 && this.direction == 'left') {
                this.setFlipX(false)
                this.direction = 'right'
            }

            this.axisVector = this.getClosestAxisVector(this.inputVector)

            if (this.inputVector.x != 0 || this.inputVector.y != 0) {
                this.statemachine.setState(STATES.player.PLAYER_WALK)
            }
            else {
                this.statemachine.setState(STATES.player.PLAYER_IDLE)
            }
            
            this.body.velocity.x += this.inputVector.x * this.velocityIncrement; // increase horizontal velocity
            this.body.velocity.y += this.inputVector.y * this.velocityIncrement; // increase vertical velocity
            
        }


    }

    getClosestAxisVector(vector) {
        // Handle the zero vector case directly.
        if (vector.x === 0 && vector.y === 0) {
          return new Phaser.Math.Vector2(0, 0);
        }
      
        const absX = Math.abs(vector.x);
        const absY = Math.abs(vector.y);
      
        if (absX > absY) {
          return new Phaser.Math.Vector2(Math.sign(vector.x), 0);
        } else if (absY > absX) {
          return new Phaser.Math.Vector2(0, Math.sign(vector.y));
        }
         else
        {
           return new Phaser.Math.Vector2(Math.sign(vector.x), 0);
        }
    }

    attack() {
        if (this.attackCounter > 0) return;

        this.attackCounter = this.attackRate;
        this.statemachine.setState(STATES.player.PLAYER_ATTACK)

    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) this.die();
    }

    die() {
        this.scene.addExplosion(this.x, this.y);
        this.destroy(); // destroy sprite so it is no longer updated
    }


    createAnimations() {
        let player_idle_anim = this.load_animation(ANIMATION.player.player_idle, ASSETS.spritesheet.player.player_idle)
        let player_walk_anim = this.load_animation(ANIMATION.player.player_walk, ASSETS.spritesheet.player.player_walk)
        let player_attack_anim = this.load_animation(ANIMATION.player.player_attack, ASSETS.spritesheet.player.player_attack)
    }

    incrementManaPotion(val) {
        this.manaPotionCt += val
        this.scene.updateManaPotionCt(val)
    }
}