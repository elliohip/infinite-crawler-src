import Phaser from 'phaser'
import ASSETS from '../../assets';

import PlayerMagnetBox from '../Boxes/PlayerMagnetBox'

export default class Coin extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, coin_id, value, w=5, h=5) {
        super(scene, x, y, ASSETS.spritesheet.world.dungeon_tiles.key, 86);
        this.id = coin_id
        this.width = w 
        this.height = h
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.value = value

        this.magnetBox = new PlayerMagnetBox(scene, x, y, Phaser.Math.RND.uuid(), w * 2, h * 2)
        
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
        this.magnetBox.destroy()
        super.destroy()
    }
}