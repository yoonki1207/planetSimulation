import {Queue} from './utils.js';
import { Dot } from './dot.js';
import { FREQUENCY } from './resources.js';

const TAIL_TYPE = ['none', 'dot', 'line'];

export class TailController {
    constructor() {
        this.queue = new Queue();
        this.frequency = FREQUENCY;
        this.tick = 1;
        this.tailType = 1;
        this.color = "#fff";
    }

    update(x, y, color) {
        this.color = color;
        if(this.tick % this.frequency === 0) {
            let tail = new Dot(x, y, color, 5);
            this.queue.enqueue(tail);
        }
        if(this.queue.front().isDead) this.queue.dequeue();
        this.tick++;
    }

    animation(ctx) {
        if(this.tailType % TAIL_TYPE.length == 1) {
            this.queue._arr.map((element)=>{
                element.update();
                ctx.beginPath();
                ctx.fillStyle = element.color;
                ctx.arc(element.x, element.y, element.radius, 0, Math.PI*2, false);
                ctx.fill();
            }, this);
        } else if (this.tailType % TAIL_TYPE.length == 2) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.moveTo(this.queue._arr[0]?.x, this.queue._arr[0]?.y);
            for(let i = 0; i < this.queue._arr.length; i++) {
                this.queue._arr[i].update();
                ctx.lineTo(this.queue._arr[i].x, this.queue._arr[i].y);
            }
            ctx.stroke();
        }
    }
}