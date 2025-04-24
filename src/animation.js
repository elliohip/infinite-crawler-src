import ASSETS from './assets.js';
import Phaser from 'phaser';


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
            frameRate: 8,
            config: {start: 0, end: 2}
        },
        'player_idle_up': {
            key: "player-idle-up",
            texture: ASSETS.spritesheet.player.player_idle.key,
            frameRate: 8,
            config: {start: 6, end: 8}
        },
        'player_idle_side': {
            key: "player-idle-side",
            texture: ASSETS.spritesheet.player.player_idle.key,
            frameRate: 8,
            config: {start: 3, end: 5}
        },

        'player_walk_down': {
            key: 'player-walk-down',
            texture: ASSETS.spritesheet.player.player_walk.key,
            frameRate: 8,
            config: {start: 0, end: 3}
        },
        'player_walk_up': {
            key: 'player-walk-up',
            texture: ASSETS.spritesheet.player.player_walk.key,
            frameRate: 8,
            config: {start: 8, end: 11}
        },
        'player_walk_side': {
            key: 'player-walk-side',
            texture: ASSETS.spritesheet.player.player_walk.key,
            frameRate: 8,
            config: {start: 4, end: 7}
        },

        
        'player_attack_side': {
            key: 'player-attack-side',
            texture: ASSETS.spritesheet.player.player_attack.key,
            frameRate: 2,
            config: {start: 3, end: 3}
        },
        'player_attack_down': {
            key: 'player-attack-down',
            texture: ASSETS.spritesheet.player.player_attack.key,
            frameRate: 2,
            config: {start: 0, end: 0}
        },
        'player_attack_up': {
            key: 'player-attack-up',
            texture: ASSETS.spritesheet.player.player_attack.key,
            frameRate: 2,
            config: {start: 1, end: 1}
        }
    }
};