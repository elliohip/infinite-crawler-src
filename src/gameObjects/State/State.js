export default class State {

    constructor(gameobject, name) {
        this.gameobject = gameobject
        this.statemachine = null;
        this.name = name
    }

    getName() {
        return this.name
    }

    setStatemachine(statemachine) {
        this.statemachine = statemachine
    }

    onUpdate() {

    }

    onEnter() {
        
    }
}