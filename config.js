import cur_mode from './current_mode.js'


var common_config = {
    fontFamily: 'Arial Black',
    player: {
        maxSpeed: 125,
        speedDelta: 30,
        initHealth: 4,
        attackRate: 1
    },
    world: {

    },
    camera: {
        width: 256,
        height: 256
    },
    baseDrag: 1000
}


var prod_config = {
    mode: 'p',

    ...common_config
}


var dev_config = {
    mode: 'd',
    logging: 'false',
    

    ...common_config
}

function get_config(mode) {
    if (mode == 'd') {
        return dev_config
    } else {
        return prod_config
    }
}
export default get_config(cur_mode)