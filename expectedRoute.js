import { Dot } from "./dot.js";
import { DEFAULT_MASS, FREQUENCY, G_CONSTANT, MOUSE_POWER } from "./resources.js";
import { changeOpacity, distance } from "./utils.js";

export class ExpectedRoute {
    constructor(x, y, planets, color) {
        this.dots = [];
        this.nDots = 60;
        this.freqency = FREQUENCY;
        this.planets = planets;
        this.color = color;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        let x = this.x;
        let y = this.y;
        let vx = this.vx;
        let vy = this.vy;
        for(let i = 0; i < this.nDots; i++) {
            let vecSum = {x: 0, y: 0}; // accelerator
            for(let j = 0; j < this.planets.length; j++) {
                let vector = {
                    x: (this.planets[j].state.x - x),
                    y: (this.planets[j].state.y - y)
                };
                const d = distance({x: 0, y: 0}, vector);
                if(d < 0.01) continue;
                const c = G_CONSTANT * this.planets[j].mass / Math.pow(d, 3);
                vector.x *= c;
                vector.y *= c;
                vecSum.x += vector.x;
                vecSum.y += vector.y;
            }
            vx += vecSum.x / 60;
            vy += vecSum.y / 60;
            x += vx;
            y += vy;
            this.dots[i] = new Dot(x, y, this.color, 1);
            this.color = changeOpacity(this.color, ((this.nDots - i)/this.nDots).toFixed(2));
            console.log(this.color, this.color.lastIndexOf(','), this.color.lastIndexOf(')'));
        }
    }

    animation(ctx) {
        for(let i = 0; i < this.nDots; i++) {
            ctx.beginPath();
            ctx.fillStyle = this.dots[i].color;
            ctx.arc(this.dots[i].x, this.dots[i].y, 4, 0, Math.PI*2, false);
            ctx.fill();
        }
        console.log(this.x, this.y, this.dots[0].x, this.dots[0].y);
    }

    onMouseMove(x, y) {
        this.vx = (this.x - x)*MOUSE_POWER;
        this.vy = (this.y - y)*MOUSE_POWER;
    }
}