import Phaser from 'phaser'
import ASSETS from '../../assets';

import HitBox from '../Boxes/HitBox'

export default class Sword extends Phaser.Physics.Arcade.Sprite {

    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} value 
     * @param {*} w 
     * @param {*} h 
     * @param {*} sword_tile_key key for the tilemap
     * @param {*} sword_id id in the tilemap for the initial sprite frame (an integer)
     * @param {*} animation_id id in the phaser loader for the animation (string)
     */
    constructor(scene, x, y, damage, w, h, sword_tile_key, sword_id, animation_id) {
        super(scene, x, y, sword_tile_key, sword_id);
        this.id = Phaser.Math.RND.uuid()
        this.width = w
        this.height = h
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.value = value
        this.animation_id = animation_id
        this.sword_tile_key = sword_tile_key
        this.damage = damage
        //this.hitBox = new HitBox(this, 0, 0, )
        
        
    }
    create() {
        let prev_width = this.body.width
        let prev_height = this.body.height
        
        // this.body.width = this.width
        // this.body.height = this.height
        this.setSize(this.width, this.height)
        
        this.setOffset(prev_width / 2 - this.width/2, (prev_height / 2 - this.height/2) + 1)
        this.anims.play(this.animation_id)
    }
    destroy() {
        this.hitBox.destroy()
        super.destroy()
    }
}