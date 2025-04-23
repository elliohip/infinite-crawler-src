import PlayerState from "./PlayerState.js";
import STATES from '../../../../States.js'
import ANIMATION from '../../../../animation.js'

export default class PlayerAttackState extends PlayerState {


    constructor(player) {
        super(player, STATES.player.PLAYER_ATTACK)
        this.startTime = Date.now()
    }

    onUpdate() {
        if (this.gameobject.isAttacking == false) {
            this.statemachine.setState(STATES.player.PLAYER_IDLE)
        }
    }
    onEnter() {
        this.gameobject.anims.play(ANIMATION.player.player_attack);
        this.gameobject.isAttacking = true
        let obj_ref = this.gameobject
        this.gameobject.on(Phaser.Animations.Events.ANIMATION_COMPLETE, function () {
            // console.log(obj_ref.anims.getName())
            
            obj_ref.isAttacking = false
            
        })
    }

}