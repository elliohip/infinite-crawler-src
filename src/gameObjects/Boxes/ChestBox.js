import Phaser from 'phaser'
import ASSETS from '../../assets';
import OBJECT_TYPES from '../../object_types';
import InteractBox from '../Boxes/InteractBox'

export default class ChestBox extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, w, h, chestType, item, sprite_id) {
        
        // this.id = Phaser.Math.RND.uuid()
        console.log("w: " + w)
        console.log("h: " + h)
        // this.width = w 
        // this.height = h
        super(scene, x, y, ASSETS.spritesheet.world.dungeon_tiles.key, sprite_id);
        switch (chestType) {
            case OBJECT_TYPES.MED_WOOD_CHEST: 
                this.sprite_id = 83
                break;
        }
        scene.add.existing(this);
        this.interactBox = new InteractBox(scene, x, y, this, w * 3, h * 3)
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
    destroy() {
        this.interactBox.destroy()
        super.destroy()
    }
}