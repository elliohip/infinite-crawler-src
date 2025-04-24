import PlayerState from "./PlayerState.js"
import STATES from '../../../../States.js'
import ANIMATION from '../../../../animation.js'

export default class PlayerWalkState extends PlayerState {

    constructor(player) {
        super(player, STATES.player.PLAYER_WALK)

        this.animDown = ANIMATION.player.player_walk_down
        this.animUp = ANIMATION.player.player_walk_up
        this.animSide = ANIMATION.player.player_walk_side
        // this.currAnim = ANIMATION.player.player_walk_side
    }


}