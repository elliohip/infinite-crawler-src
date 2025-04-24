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
                key: 'PlayerIdle',
                args: ['assets/HumanAnimations/Player/Player-Idle.png', {
                    frameWidth: 16,
                    frameHeight: 16,
                }]
            },
            player_walk: {
                key: 'PlayerWalk',
                args: ['assets/HumanAnimations/Player/Player-Walk.png', {
                    frameWidth: 16,
                    frameHeight: 16
                }]
            },
            player_attack: {
                key: "PlayerAttack",
                args: ['assets/HumanAnimations/Player/Player-Attack.png', {
                    frameWidth: 16,
                    frameHeight: 16
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