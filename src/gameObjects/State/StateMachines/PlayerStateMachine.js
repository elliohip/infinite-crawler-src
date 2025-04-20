import StateMachine from "../StateMachine.js"
import PlayerIdleState from "../States/Player/PlayerIdleState.js"

export default class PlayerStateMachine extends StateMachine {

    constructor(id) {
        super(id, new PlayerIdleState())
    }


}