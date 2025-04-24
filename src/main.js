import { Boot } from './scenes/Boot.js';
import { Preloader } from './scenes/Preloader.js';
import { Start } from './scenes/Start.js';
import { Game } from './scenes/Game.js';
import { GameOver } from './scenes/GameOver.js';
import config from '../config.js';

const gameconfig = {
    type: Phaser.AUTO,
    title: 'InfiniCrawl',
    description: '',
    backgroundColor: '#000000',
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true,
            debug: false,
            gravity: { y: 0 },
            checkCollision: {
                        up: true,
                        down: true,
                        left: true,
                        right: true
                    }
        }, 
        /*default: 'matter',
        matter: {
            debug: true,
            gravity: {y:0}
        }*/
    },
    scene: [
        Boot,
        Preloader,
        Start,
        Game,
        GameOver
    ],
    scale: {
        mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'game-container',
        width: config.camera.width,
        height: config.camera.height,
    },
}

new Phaser.Game(gameconfig);
            