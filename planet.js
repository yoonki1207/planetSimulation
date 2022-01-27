import { Tail } from "./tail.js";
import { Queue } from "./utils.js";

const DELTA_T = 1/60;

export class Planet {
    constructor() {
        this.mass = 100;
        this.isStatic = false;
        this.color = "#000";
        this.radius = 20;
        this.state = {
            x: 0,
            y: 0,
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0
        };

        this.tailCount = 0;
        this.queue = new Queue();
    }

    resize(beforeWidth, beforeHeight, stageWidth, stageHeight) {
        this.state.x = this.state.x * stageWidth / beforeWidth;
        this.state.y = this.state.y * stageHeight / beforeHeight;
    }

    animation(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.state.x,
            this.state.y,
            this.radius,
            0,
            Math.PI*2,
            false);
        ctx.fill();
        
        for(let i = 0; i < this.queue._arr?.length; i++) {
            this.queue._arr[i].animation(ctx);
        }
    }

    update() {
        this.state.vx += this.state.ax*DELTA_T;
        this.state.vy += this.state.ay*DELTA_T;
        if(this.isStatic) {
            this.state.vx = 0;
            this.state.vy = 0;
            return;
        }

        if(this.tailCount >= 15) {
            let tail = new Tail(this.state.x, this.state.y, this.color);
            this.queue.enqueue(tail);
            this.tailCount = 0;
        }

        this.state.x += this.state.vx;
        this.state.y += this.state.vy;

        
        this.tailCount++;
        if(this.queue.front()?.isDead){
            this.queue.dequeue();
        }

        for(let i = 0; i < this.queue._arr?.length; i++) {
            this.queue._arr[i].update();
        }
    }

    setMass(mass) {
        this.mass = mass;
        return this;
    }

    setPos(pos) {
        this.state.x = pos.x;
        this.state.y = pos.y;
        return this;
    }

    setVelocity(velocity) {
        this.state.vx = velocity.vx;
        this.state.vy = velocity.vy;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setRadius(radius) {
        this.radius = radius;
        return this;
    }

    setIsstatic(isStatic) {
        this.isStatic = isStatic;
        return this;
    }
}