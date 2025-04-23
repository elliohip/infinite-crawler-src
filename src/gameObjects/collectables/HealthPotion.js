import Phaser from 'phaser'
import ASSETS from '../../assets';

export default class HealthPotion extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, coin_id, value, w=5, h=5) {
        super(scene, x, y, ASSETS.spritesheet.world.dungeon_tiles.key, 89);
        this.id = coin_id
        this.width = w 
        this.height = h
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.value = value
        
    }
    create() {
        let prev_width = this.body.width
        let prev_height = this.body.height

        this.body.width = this.width
        this.body.height = this.height
        
        this.setOffset(prev_width / 2 - this.width/2, (prev_height / 2 - this.height/2) + 1)
    }
}