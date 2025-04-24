import PlayerState from "./PlayerState.js";
import STATES from '../../../../States.js'
import ANIMATION from '../../../../animation.js'

export default class PlayerAttackState extends PlayerState {


    constructor(player) {
        super(player, STATES.player.PLAYER_ATTACK)
        this.animDown = ANIMATION.player.player_attack_down
        this.animUp = ANIMATION.player.player_attack_up
        this.animSide = ANIMATION.player.player_attack_side
        // this.currAnim = ANIMATION.player.player_attack_down
    }

    onUpdate() {
        super.onUpdate()
        if (Phaser.Animations.Events.ANIMATION_COMPLETE){

            this.gameobject.isAttacking = false
        }
        if (this.gameobject.isAttacking == false) {
            this.statemachine.setState(STATES.player.PLAYER_IDLE)
        }
    }
    onEnter() {
        super.onEnter()
        this.gameobject.isAttacking = true
        
        
    }

}