import Phaser from 'phaser'
import ASSETS from '../../assets';

import HitBox from '../Boxes/HitBox'

export default class Weapon extends Phaser.Physics.Arcade.Sprite {

    /**
     * 
     * @param {*} scene 
     * @param {*} x 
     * @param {*} y 
     * @param {*} value 
     * @param {*} w 
     * @param {*} h 
     * @param {*} weapon_tile_key key for the tilemap
     * @param {*} weapon_id id in the tilemap for the initial sprite frame 
     * @param {*} animation_id id in the phaser loader for the animation
     */
    constructor(scene, x, y, damage, w, h, weapon_tile_key, weapon_id, animation_id) {
        super(scene, x, y, weapon_tile_key, weapon_id);
        this.id = Phaser.Math.RND.uuid()
        this.width = w
        this.height = h
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.value = value
        this.animation_id = animation_id
        this.weapon_tile_key = weapon_tile_key
        this.damage = damage
        this.hitBox = new HitBox()
        
        
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
        this.magnetBox.destroy()
        super.destroy()
    }
}