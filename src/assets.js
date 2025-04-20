export default {
    // 'audio': {
    //     score: {
    //         key: 'sound',
    //         args: ['assets/sound.mp3', 'assets/sound.m4a', 'assets/sound.ogg']
    //     },
    // },
    // 'image': {
    //     spikes: {
    //         key: 'spikes',
    //         args: ['assets/spikes.png']
    //     },
    // },
    'spritesheet': {
        player: {
            vamp_idle: {
                key: 'VampIdle',
                args: ['assets/EnemyAnimations/enemies-vampire_idle.png', {
                    frameWidth: 32,
                    frameHeight: 32,
                }]
            },
            vamp_walk: {
                key: 'VampWalk',
                args: ['assets/EnemyAnimations/enemies-vampire_movement.png', {
                    frameWidth: 32,
                    frameHeight: 32
                }]
            },
            vamp_attack: {
                key: "VampAttack",
                args: ['assets/EnemyAnimations/enemies-vampire_attack.png', {
                    frameWidth: 32,
                    frameHeight: 32
                }]
            }
        },
        world: {
            tiles: {
                key: 'maptiles1',
                args: ['assets/Levels/dungeon-tilemap1_total.png', {
                    frameWidth: 16,
                    frameHeight: 16
                }]
            }
        },
    },
    'image': {
        levels: {
            levelInit: {
                key: 'img-level0',
                args: ['assets/Levels/dungeon-tilemap1_total.png']
            }
        }
    } 
    ,
    'tilemapTiledJSON': {
        levels: {
            levelInit: {
                key: "level0",
                args: ['assets/Levels/dungeon-tilemap1.json']
            }
        } 
    }
};