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
        this.planetController.addPlanet({x: this.stageWidth/2, y: this.stageHeight/2}, {vx: 0, vy: 0}, 15, "#F00", true);
        this.planetController.addPlanet({x: this.stageWidth/2+100, y: this.stageHeight/2+50}, {vx: 0, vy: -1}, 9, "#00F", false);
        
        this.planetController.addPlanet({x: this.stageWidth/2+200, y: this.stageHeight/2+100}, {vx: -1, vy: +1.1}, 9, "#0FF", false);

        window.requestAnimationFrame(this.animation.bind(this)); // 왜 bind를 해야하는지 이해가 안.. 아니 음 될거같음

    }

    resize() {
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