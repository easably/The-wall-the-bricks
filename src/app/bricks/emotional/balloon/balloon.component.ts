import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainBridgeService } from 'src/app/services/main-bridge/main-bridge.service';
import { EmotionalBrick } from 'src/app/interfaces/brick.interface';
import { brickProps, emotionalBrickInitializationData } from 'src/app/types/brick.type';
import { BalloonBrick } from './phaser.scene';


@Component({
  selector: 'app-balloon',
  templateUrl: './balloon.component.html',
  styleUrls: ['./balloon.component.scss']
})
export class BalloonComponent implements EmotionalBrick, OnInit, OnDestroy {
  private _brickProps: brickProps = {
    name: 'Balloon',
    timeGame: true,
    viewPosition: 'full'
  }

  private game: BalloonBrick;
  private gameTimer: number = 3;

  // phaserGame: Phaser.Game;
  // private emitter: Phaser.Events.EventEmitter;

  constructor(
    private mainBridgeService: MainBridgeService
  ) {}

  ngOnInit(): void {
    // this.phaserGame = new Phaser.Game(this.config);
    // this.emitter = EventDispatcher.getInstance();

    // this.emitter.on('screenbordercollide', this.balloonCollideHandler)
  }

  get brickProps(): brickProps {
    return this._brickProps;
  }
  set brickState(value: number) {
    if (value > 4) {
      this.righthAnswer();
    } else {
      this.wrongAnswer();
    }
  }

  ngOnDestroy() {
  }

  initializeBrick(data: emotionalBrickInitializationData) {
    this.gameTimer = data.gameTimer;

    const container = document.getElementById('content');

    if(this.game) {
      this.game.destroy();
    }
    this.game = new BalloonBrick(container, this.gameTimer, this.gameEnd.bind(this));
  }

  private righthAnswer() {
    this.game.balloonState = 1;
  }

  private wrongAnswer() {
    this.game.balloonState = 0;
  }

  gameEnd() {
    console.log('game is end')
  }
}

// class Scene extends Phaser.Scene {
//   balloon: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
//   private balloonVelocity: number = 1000;
//   private emitter: Phaser.Events.EventEmitter;

//   constructor() {
//     super('Game');

//     this.balloonVelocity = Math.floor((window.innerHeight * window.devicePixelRatio - 400) / gameTimer);
//     this.emitter = EventDispatcher.getInstance();
//   }

//   preload() {
//     this.load.svg('balloon', '/assets/bricks/balloon.svg');
//   }

//   create() {
//     this.cameras.main.setRoundPixels(true);

//     let particles = this.add.particles('balloon');

//     let particlesEmitter = particles.createEmitter({
//       speed: 300,
//       scale: { start: 1, end: 0 },
//       blendMode: 'ADD'
//     });

//     this.balloon = this.physics.add.image(-200, 400, 'balloon');
//     this.balloon.setDisplaySize(Math.floor(70 * window.devicePixelRatio), Math.floor(101 * window.devicePixelRatio));
//     this.balloon.setVelocity(30, 10);
//     this.balloon.setMaxVelocity(this.balloonVelocity);
//     this.balloon.setBounce(0);
//     this.balloon.setCollideWorldBounds(true);

//     // @ts-ignore
//     this.balloon.body.onWorldBounds = true;
//     this.physics.world.on('worldbounds', body => {
//       // @ts-ignore
//       this.balloon.body.onWorldBounds = false;
//       this.emitter.emit('screenbordercollide', body);
//     });

//     particlesEmitter.startFollow(this.balloon);
//   }
// }

// class EventDispatcher extends Phaser.Events.EventEmitter {
//   constructor() {
//     super();
//   }

//   static getInstance() {
//     if (instance == null) {
//         instance = new EventDispatcher();
//     }
//     return instance;
//   }
// }

// class Balloon extends Phaser.Physics.Arcade.Image {

//   constructor(scene: Phaser.Scene, x, y, width, height, time) {
//     super(scene, x, y, 'balloon');

//     const maxVelocity = (window.innerHeight * window.devicePixelRatio - y) / time;
//     this._init(x, y, width, height);
//     this._create(maxVelocity)
//   }

//   private _init(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.setDisplaySize(Math.floor(width * window.devicePixelRatio), Math.floor(height * window.devicePixelRatio));
//   }

//   private _create(maxVelocity) {
//     // this.setVelocity(30, 10);
//     // this.setMaxVelocity(maxVelocity);
//     // this.setBounce(0);
//     // this.setCollideWorldBounds(true);

//     // @ts-ignore
//     // this.body.onWorldBounds = true;

//     // this.physics.world.on('worldbounds', body => {
//     //   console.log(body)
//     //   // @ts-ignore
//     //   this.balloon.body.onWorldBounds = false;
//     // });
//   }
// }