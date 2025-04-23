import Phaser from 'phaser'
import ASSETS from '../../assets';

export default class InteractBox extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, item, w, h) {
        super(scene, x, y, ASSETS.spritesheet.world.dungeon_tiles.key, 86);
        this.item = item
        this.width = w 
        this.height = h
        scene.add.existing(this);
        scene.physics.add.existing(this);

    }
    create() {
        let prev_width = this.body.width
        let prev_height = this.body.height

        // this.body.width = this.width
        // this.body.height = this.height
        this.setSize(this.width, this.height)
        
        this.setOffset(prev_width / 2 - this.width/2, (prev_height / 2 - this.height/2) + 1)
    }
    
}