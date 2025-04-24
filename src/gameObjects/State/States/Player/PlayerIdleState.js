import PlayerState from "./PlayerState.js"
import STATES from '../../../../States.js'
import ANIMATION from '../../../../animation.js'

export default class PlayerIdleState extends PlayerState {

    constructor(player) {
        super(player, STATES.player.PLAYER_IDLE)

        this.animDown = ANIMATION.player.player_idle_down
        this.animUp = ANIMATION.player.player_idle_up
        this.animSide = ANIMATION.player.player_idle_side
        this.currAnim = ANIMATION.player.player_idle_side
    }

}