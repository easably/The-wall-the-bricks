import Phaser from 'phaser';


let instance = null;

export class BalloonBrick extends Phaser.Scene {
	private config = {
		type: Phaser.AUTO,
		parent: null,
		width: window.innerWidth,
		height: window.innerHeight,
		backgroundColor: '#c5e5ff',
		// disableContextMenu: true,
		dom: {
		  createContainer: true
		},
		physics: {
		  default: 'arcade',
		  arcade: {
			gravity: { y: 300 },
			debug: false
		  }
		},
		scene: Scene,
		scale: {
		  mode: Phaser.Scale.NONE,
		  width: window.innerWidth * window.devicePixelRatio,
		  height: window.innerHeight * window.devicePixelRatio,
		  zoom: 1 / window.devicePixelRatio
		}
	};


	app;
	emitter: Phaser.Events.EventEmitter;
	gameTimer;
	gameEndCallback;

	constructor(container: HTMLElement, timer: number, gameEndCb) {
		super('game');

		this.config.parent = container;
		this.gameTimer = timer;
		this.gameEndCallback = gameEndCb;

		this.emitter = EventDispatcher.getInstance();

		this.app = new Phaser.Game(this.config);

		this.emitter.on('screenbottomcollide', this.balloonCollideHandler.bind(this));
	}

	destroy() {
		console.log('destroy')
		this.app.destroy();
	}

	set balloonState(value) {
		this.emitter.emit('onuseranswer', value);
	}

	private balloonCollideHandler(data) {
		this.gameEndCallback();
	}
}

class Scene extends Phaser.Scene {
	private emitter: Phaser.Events.EventEmitter;
	private maxVelocity = 900;
	private balloon: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

	private cloud1

	constructor() {
		super('Game');

		this.emitter = EventDispatcher.getInstance();
		this.emitter.on('onuseranswer', this.userAnswerHandler.bind(this));
	}

	preload() {
		this.load.setPath('/assets/bricks/balloon/');
		this.load.svg('balloon', 'balloon.svg');
		this.load.svg('cloud-1', 'cloud-1.svg');
		this.load.svg('cloud-1', 'cloud-1.svg');
		this.load.svg('cloud-1', 'cloud-1.svg');
	}

	create() {
		this.cameras.main.setRoundPixels(true);
		
		const graphics = this.add.graphics();
		graphics.fillGradientStyle(0xEAE8FF, 0xEAE8FF, 0x8B80FA, 0x8B80FA, 1);

		this.createStar(20);
		// @ts-ignore
		graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

		this.cloud1 = this.add.tileSprite(200, 1200, 300, 200, 'cloud-1');

    this.balloon = this.createBalloon();

		// @ts-ignore
		this.balloon.body.onWorldBounds = true;
		this.physics.world.on('worldbounds', body => {
			if (body.y + body.height === this.physics.world.bounds.bottom) {
				// @ts-ignore
				this.balloon.body.onWorldBounds = false;
				this.emitter.emit('screenbottomcollide', body);
			}
		});

  }

	update() {
		// console.log(this.balloon.y)
	}

	private createBalloon() {
		const top = 400;
		const balloonWidth = Math.floor(70 * window.devicePixelRatio);
		const balloonHeight = Math.floor(101 * window.devicePixelRatio);

		const left = Math.floor(Math.random() * (this.physics.world.bounds.width - balloonWidth) + balloonWidth);

		const balloon = this.physics.add.image(left, top, 'balloon');
		balloon.setDisplaySize(balloonWidth, balloonHeight);
		balloon.setMaxVelocity(this.maxVelocity);
		balloon.setBounce(0);
		balloon.setCollideWorldBounds(true);

		return balloon;
	}

	private createStar(count) {
		for (let i = 0; i <= count; i++) {
			const x = Math.floor(Math.random() * this.physics.world.bounds.width);
			const y = Math.floor(Math.random() * this.physics.world.bounds.height);
			const radius = Math.floor(Math.random() * 30);

			this.add.pointlight(x, y, 0xfff, radius, 0.7);
		}
	}

	private userAnswerHandler(data) {
		if (data === 1) {
			this.balloon.setMaxVelocity(300);
			this.balloon.setVelocityY(-300);
		}
		else {
			this.balloon.setMaxVelocity(800);
		}
		setTimeout(() => {
			this.balloon.setMaxVelocity(this.maxVelocity);
		}, 1000);
	}
}

class EventDispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }

  static getInstance() {
    if (instance == null) {
        instance = new EventDispatcher();
    }
    return instance;
  }
}