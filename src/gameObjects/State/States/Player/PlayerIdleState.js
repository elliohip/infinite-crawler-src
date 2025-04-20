import PlayerState from "./PlayerState.js"
import STATES from '../../../../States.js'
import ANIMATION from '../../../../animation.js'

export default class PlayerIdleState extends PlayerState {

    constructor(player) {
        super(player, STATES.player.PLAYER_IDLE)
    }

    onUpdate() {
        this.gameobject.anims.play(ANIMATION.player.vamp_idle.key, true)
    }

    onEnter() {
        this.gameobject.anims.play(ANIMATION.player.vamp_idle.key, false)
    }
}