
export class Tail {
    constructor(x, y, color) {
        this.pos = {x: x, y: y};
        this.color = color;
        this.radius = 4;
        this.isDead = false;
    }

    resize(beforeWidth, beforeHeight, stageWidth, stageHeight) {
        this.pos.x = this.pos.x * stageWidth / beforeWidth;
        this.pos.y = this.pos.y * stageHeight / beforeHeight;
    }

    update() {
        this.radius *= 0.98;
        if(this.radius <= 0.01)
            this.isDead = true;
    }

    animation(ctx) {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
}