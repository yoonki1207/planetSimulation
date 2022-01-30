import {Planet} from './planet.js';
import {distance} from './utils.js';
import { G_CONSTANT } from './resources.js';

export class PlanetController {
    constructor() {
        this.planets = [];
        this.tailStyle = 1;
    }

    addPlanet(pos, velocity, radius, color, isStatic) {
        let planet = new Planet();
        planet.setPos(pos).setVelocity(velocity).setColor(color).setRadius(radius).setIsstatic(isStatic).setTailStyle(this.tailStyle);
        this.planets.push(planet);
        planet = null; // is this code necessary??
    }

    push(planet) {
        this.planets.push(planet);
    }

    pop() {
        delete this.planets[this.planets.length-1];
        this.planets.length -= 1;
    }

    resize(beforeWidth, beforeHeight, stageWidth, stageHeight) {
        for(let i = 0; this.planets[i] != undefined; i++) {
            this.planets[i].resize(beforeWidth, beforeHeight, stageWidth, stageHeight);
        }
    }

    animation(ctx) {
        for(let i = 0; this.planets[i] != undefined; i++) {
            this.planets[i].update();
            this.planets[i].animation(ctx);
        }
    }

    update() {
        console.log(this.planets.length);
        for(let i = 0; this.planets[i] != undefined; i++) {
            let vecSum = {x: 0, y: 0};
            for(let j = 0; this.planets[j] != undefined; j++) {
                if(i==j) continue;
                let vector = {
                    x: (this.planets[j].state.x - this.planets[i].state.x), 
                    y: (this.planets[j].state.y - this.planets[i].state.y)
                };
                const d = distance({x: 0, y: 0}, vector);
                if(d < this.planets[i].radius + this.planets[j].radius) continue; // 서로 너무 붙으면 중력 작용 x
                // if( d < 0.1 )continue;
                const constant = G_CONSTANT * this.planets[j].mass / Math.pow(d, 3);
                vector.x *= constant;
                vector.y *= constant;
                vecSum.x += vector.x;
                vecSum.y += vector.y;
            }
            this.planets[i].state.ax = vecSum.x;
            this.planets[i].state.ay = vecSum.y;

            // delete check
            if(distance({x: 0, y:0}, this.planets[i].state) > 50000) {
                delete this.planets[i];
                this.planets.splice(i, 1);
            }
        }
    }

    nextTailStyle() {
        this.tailStyle++;
        this.planets.map((element)=>element.setTailStyle(this.tailStyle));
    }

    toggleRadius() {
        
    }
}