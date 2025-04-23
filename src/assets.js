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
            player_idle: {
                key: 'VampIdle',
                args: ['assets/EnemyAnimations/enemies-vampire_idle.png', {
                    frameWidth: 32,
                    frameHeight: 32,
                }]
            },
            player_walk: {
                key: 'VampWalk',
                args: ['assets/EnemyAnimations/enemies-vampire_movement.png', {
                    frameWidth: 32,
                    frameHeight: 32
                }]
            },
            player_attack: {
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
                args: ['assets/Levels/dungeon-tilemap1.png', {
                    frameWidth: 16,
                    frameHeight: 16
                }]
            },
            dungeon_tiles: {
                key: "dungTiles",
                args: ['assets/Dungeon_Tileset.png', {
                    frameHeight: 16,
                    frameWidth: 16
                }]
            }
        },
    },
    'image': {
        levels: {
            levelInit: {
                key: 'img-level0',
                args: ['assets/Dungeon_Tileset.png']
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