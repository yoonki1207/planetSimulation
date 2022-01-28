import { TailController } from "./tailController.js";

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
        this.tailController = new TailController();
        this.tailStyle = 1;
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
        
        this.tailController.animation(ctx);
    }

    update() {
        this.state.vx += this.state.ax*DELTA_T;
        this.state.vy += this.state.ay*DELTA_T;
        if(this.isStatic) {
            this.state.vx = 0;
            this.state.vy = 0;
            return;
        }

        this.state.x += this.state.vx;
        this.state.y += this.state.vy;
        this.tailController.update(this.state.x, this.state.y, this.color);
    }

    setTailStyle(tailStyle) {
        this.tailController.tailType = tailStyle;
        return this;
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