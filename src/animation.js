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
        'player_idle_down': {
            key : 'player-idle-down',
            texture: ASSETS.spritesheet.player.player_idle.key,
            frameRate: 10,
            config: {start: 0, end: 0}
        },
        'player_idle_up': {
            key: "player-dile-down",
            texture: ASSETS.spritesheet.player.player_idle.key,
            frameRate: 10,
            config: {start: 1, end: 1}
        },
        'player_idle_left': {
            key: "player-idle-left",
            texture: ASSETS.spritesheet.player.player_idle.key,
            frameRate: 10,
            config: {start: 2, end: 2}
        },
        'player_idle_right': {
            key: "player-idle-left",
            texture: ASSETS.spritesheet.player.player_idle.key,
            frameRate: 10,
            config: {start: 3, end: 3}
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
            config: {start: 0, end: 4}
        }
    }
};