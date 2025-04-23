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
        'player_idle': {
            key : 'player-idle',
            texture: ASSETS.spritesheet.player.player_idle.key,
            frameRate: 10,
            config: {start: 0, end: 4}
        },
        'player_walk': {
            key: 'player-walk',
            texture: ASSETS.spritesheet.player.player_walk.key,
            frameRate: 10,
            config: {start: 0, end: 7}
        },
        'player_attack': {
            key: 'player-attack',
            texture: ASSETS.spritesheet.player.player_attack.key,
            frameRate: 16,
            config: {start: 0, end: 15}
        }
    }
};