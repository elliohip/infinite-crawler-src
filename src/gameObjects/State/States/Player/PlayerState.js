import CharacterState from "../CharacterState.js"

export default class PlayerState extends CharacterState {

    constructor(player, name) {
        super(player, name)
        this.animUp = ''
        this.animDown = ''
        this.animSide = ''
        this.currAnim = ''
    }

    playAnim() {
        this.gameobject.anims.play(this.currAnim.key, true);
    }

    onUpdate() {
        // console.log(this.currAnim.texture)
        switch(this.gameobject.direction){
            case 'left':
                this.currAnim = this.animSide
                break;
            case 'right':
                this.currAnim = this.animSide
                break;
            case 'up':
                this.currAnim = this.animUp
                break;
            case 'down':
                this.currAnim = this.animDown
                break;
        }
        this.playAnim()
    }
    onEnter() {
        switch(this.gameobject.direction){
            case 'left':
                this.currAnim = this.animSide
                break;
            case 'right':
                this.currAnim = this.animSide
                break;
            case 'up':
                this.currAnim = this.animUp
                break;
            case 'down':
                this.currAnim = this.animDown
                break;
        }
        console.log(this.gameobject.direction)
        this.playAnim()
    }
}