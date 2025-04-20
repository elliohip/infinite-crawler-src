import PlayerState from "./PlayerState.js"
import STATES from '../../../../States.js'
import ANIMATION from '../../../../animation.js'

export default class PlayerWalkState extends PlayerState {

    constructor(player) {
        super(player, STATES.player.PLAYER_WALK)
    }

    onUpdate() {
        this.gameobject.anims.play(ANIMATION.player.vamp_walk.key, true)
    }

    onEnter() {
        this.gameobject.anims.play(ANIMATION.player.vamp_walk.key, false)
    }
}