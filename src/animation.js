import ASSETS from './assets.js';

export default {
    world: {
    'explosion': {
            key: 'explosion',
            texture: ASSETS.spritesheet.world.tiles.key,
            frameRate: 10,
            config: { start: 4, end: 8 },
        }
    },
    player: {
        'vamp_idle': {
            key : 'vamp-idle',
            texture: ASSETS.spritesheet.player.vamp_idle.key,
            frameRate: 10,
            config: {start: 0, end: 4}
        },
        'vamp_walk': {
            key: 'vamp-walk',
            texture: ASSETS.spritesheet.player.vamp_walk.key,
            frameRate: 10,
            config: {start: 0, end: 7}
        },
        'vamp_attack': {
            key: 'vamp-attack',
            texture: ASSETS.spritesheet.player.vamp_attack.key,
            frameRate: 16,
            config: {start: 0, end: 15}
        }
    }
};