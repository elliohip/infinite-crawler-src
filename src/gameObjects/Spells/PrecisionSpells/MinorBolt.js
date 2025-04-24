import PrecisionSpell from "./PrecisionSpell";

export default class MinorBolt extends PrecisionSpell {
    power = 1;
    moveVelocity = 200;

    constructor(scene, x, y, power) {
        const tileId = 11;
        super(scene, x, y, ASSETS.spritesheet.tiles.key, tileId + power);
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    getPower() {
        return this.power;
    }

    die() {
        this.scene.removeEnemyBullet(this);
    }
}