import Phaser from 'phaser'
import ASSETS from '../../assets';

export default class StaticWall extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, id, w, h) {
        super(scene, x, y, ASSETS.spritesheet.world.dungeon_tiles.key, 10);
        this.id = id
        this.width = w 
        this.height = h
        scene.add.existing(this);
        scene.physics.add.existing(this);

        
    }
    create() {
        let prev_width = this.body.width
        let prev_height = this.body.height
        
        this.setSize(this.width, this.height)

        this.setImmovable(true)
        
        // this.setOffset(prev_width / 2 - this.width/2, (prev_height / 2 - this.height/2) + 1)
    }
}