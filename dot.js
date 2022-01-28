
export class Dot {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
        this.isDead = false;
    }

    update() {
        this.radius *= 0.98;
        if(this.radius < 0.1) this.isDead = true;
    }
}