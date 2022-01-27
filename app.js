import { Planet } from './planet.js';
import {PlanetController} from './planetController.js';
import {randomColor} from './utils.js';

class App{
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        window.addEventListener('mouseup', this.onMouseDown.bind(this), false);
        this.resize();

        this.offsetPos = {x: 0, y: 0};

        this.planetController = new PlanetController();
        this.planetController.push(
            (new Planet()).
            setMass(200).
            setPos({x: this.stageWidth/2, y: this.stageHeight/2}).
            setVelocity({vx: 0, vy: 0}).
            setRadius(15).
            setColor("#F00").
            setIsstatic(true)
        );
        this.planetController.push(
            (new Planet()).
            setMass(100).
            setPos({x: this.stageWidth/2+100, y:this.stageHeight/2+50}).
            setVelocity({vx: 0, vy: -2}).
            setRadius(9).
            setColor("#00F").
            setIsstatic(false)
        );
        this.planetController.push(
            (new Planet()).
            setMass(100).
            setPos({x: this.stageWidth/2-100, y:this.stageHeight/2+100}).
            setVelocity({vx: 1, vy: 1.1}).
            setRadius(9).
            setColor("#0FF").
            setIsstatic(false)
        );

        window.requestAnimationFrame(this.animation.bind(this)); // 왜 bind를 해야하는지 이해가 안.. 아니 음 될거같음

    }

    resize() {
        this.planetController?.resize(this.stageWidth, this.stageHeight, document.body.clientWidth, document.body.clientHeight);

        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth;
        this.canvas.height = this.stageHeight;

        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }

    animation() {
        window.requestAnimationFrame(this.animation.bind(this));
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        this.planetController.update();
        this.planetController.animation(this.ctx);
    }

    onMouseDown(e) {
        if(e.type=="mouseup") {
            this.onMouseUp(e);
        } else {
            let x = e.offsetX;
            let y = e.offsetY;
            this.offsetPos= {x: x, y: y};
        }
    }

    onMouseUp(e) {
        let x = e.offsetX;
        let y = e.offsetY;
        const c = 0.1;
        let downX = this.offsetPos.x;
        let downY = this.offsetPos.y;
        this.offsetPos.x -= x;
        this.offsetPos.y -= y;
        this.planetController.addPlanet({x: downX, y: downY}, {vx: this.offsetPos.x*c, vy: this.offsetPos.y*c}, 9, randomColor(), false);
    }
}

window.onload = () => {
    new App();
}