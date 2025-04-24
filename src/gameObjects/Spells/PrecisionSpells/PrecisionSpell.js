import ASSETS from "../../../assets";
import Spell from "../Spell";


export default class PrecisionSpell extends Spell {
    damage = 1;
    moveVelocity = 0;

    constructor(scene, x, y, power, manaCost, velocity, tileId) {
        this.moveVelocity = velocity;
        this.width = 7;
        this.height = 3;
        this.damage = power;
        super(scene, x, y, manaCost, this.width, this.height, ASSETS.spritesheet.tiles.key, tileId);
    }
}