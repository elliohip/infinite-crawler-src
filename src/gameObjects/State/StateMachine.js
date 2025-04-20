import STATES from '../../States.js'

export default class StateMachine {

    constructor(id) {

        if(id != null) {
            this.id = id
        }
        else {
            this.id = Phaser.Math.RND.uuid()
        }

        this.currentState = undefined
        this.states = new Map()
        this.isTransitioning = false
        this.stateQueue = []

    }

    update() {
        const queuedState = this.stateQueue.shift()
        if (queuedState !== undefined) {
            this.setState(queuedState.state, queuedState.args)
            return
        }
        if (this.currentState && this.currentState.onUpdate){
            this.currentState.onUpdate()
        }
    }

    setState(name, ...args) {
        let methodName = 'setState'
        if(!this.states.has(name)){
            console.warn(`[${StateMachine.name}-${this.id}:${methodName}] tried to change unknown state ${name}`)
        }
        if (this.isCurrentState(name)) {
            return;
        }
        if (this.isChangingState) {
            this.stateQueue.push({state:name, args})
            return
        }

        this.isChangingState = true;

        this.currentState = this.states.get(name)

        if (this.currentState.onEnter) {
            this.currentState.onEnter(args);
        }
        this.isChangingState = false
    }

    addState(state) {
        try {
            state.statemachine = this
            this.states.set(state.name, state)
        } catch (err) {
            console.log(err)
        }
    }

    isCurrentState(name) {
        if (!this.currentState) {
            return false
        }
        return this.currentState.name === name
    }
}