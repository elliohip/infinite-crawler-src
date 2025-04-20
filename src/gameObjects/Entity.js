import Phaser from 'phaser'
import ASSETS from '../assets';

export default class Entity extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, spriteId) {
        super(scene, x, y, ASSETS.spritesheet.player.vamp_idle.key, spriteId);
    }
    create() {
        this.setCollideWorldBounds(false);
    }
}