import { ExpectedRoute } from './expectedRoute.js';
import { Planet } from './planet.js';
import {PlanetController} from './planetController.js';
import { MOUSE_POWER } from './resources.js';
import {randomColor} from './utils.js';

class App{
    constructor() {
        this.canvas = document.createElement('canvas');
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');

        this.isDragging = false;

        this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
        
        window.addEventListener('resize', this.resize.bind(this), false);
        window.addEventListener('mousedown', this.onMouseDown.bind(this), false);
        window.addEventListener('mouseup', this.onMouseDown.bind(this), false);
        window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
        window.addEventListener('keydown', this.keyDown.bind(this), false);
        this.resize();

        this.startPos = {x: 0, y: 0};

        this.planetController = new PlanetController();
        this.planetController.push(
            (new Planet()).
            setMass(10000).
            setPos({x: this.stageWidth/2, y: this.stageHeight/2}).
            setVelocity({vx: 0, vy: 0}).
            setRadius(15).
            setColor("#E72").
            setIsstatic(true)
        );
        this.planetController.push(
            (new Planet()).
            setMass(100).
            setPos({x: this.stageWidth/2+100, y:this.stageHeight/2+50}).
            setVelocity({vx: 0, vy: -10}).
            setRadius(9).
            setColor("#23E").
            setIsstatic(false)
        );
        this.planetController.push(
            (new Planet()).
            setMass(100).
            setPos({x: this.stageWidth/2-100, y:this.stageHeight/2+100}).
            setVelocity({vx: 5, vy: 10.1}).
            setRadius(9).
            setColor("#3ee").
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
        this.expectedRoute?.update();
        this.expectedRoute?.animation(this.ctx);
    }

    onMouseDown(e) {
        if(e.type === "mouseup") {
            this.onMouseUp(e);
            this.isDragging = false;
        } else if(e.type === "mousedown"){
            this.isDragging = true;
            
            let x = e.offsetX;
            let y = e.offsetY;

            this.expectedRoute = new ExpectedRoute(x, y, this.planetController.planets);
            this.startPos= {x: x, y: y};
            let color = randomColor();
            this.planetController.addPlanet({x: x, y: y}, {vx: 0, vy: 0}, 9, color, true);
            this.planetController.planets[this.planetController.planets.length-1].setMass(0)
        }
    }

    onMouseUp(e) {
        let x = e.offsetX;
        let y = e.offsetY;
        let downX = this.startPos.x;
        let downY = this.startPos.y;
        this.startPos.x -= x;
        this.startPos.y -= y;
        delete this.expectedRoute;
        let color = this.planetController.planets[this.planetController.planets.length-1].color;
        this.planetController.pop();
        this.planetController.addPlanet({x: downX, y: downY}, {vx: this.startPos.x*MOUSE_POWER, vy: this.startPos.y*MOUSE_POWER}, 9, color, false);
        // console.log(downX, downY, this.startPos.x*MOUSE_POWER, this.startPos.y*MOUSE_POWER);
    }

    onMouseMove(e) {
        if(this.isDragging){
            this.expectedRoute.onMouseMove(e.offsetX, e.offsetY);
        }
    }

    keyDown(e) {
        if(e.key == 'l' || e.key == 'L') {
            this.planetController.nextTailStyle();
        } else if (e.key == 'o' || e.key == 'O') {
            this.planetController.toggleRadius();
        }
    }
}

window.onload = () => {
    new App();
}