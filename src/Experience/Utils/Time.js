import * as THREE from 'three'
import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
    constructor() {
        super()

        // Setup 
        this.start = Date.now()
        this.clock = new THREE.Clock()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }

    tick() {
        const currentTime = Date.now()
        this.current = currentTime
        this.elapsed = this.clock.getElapsedTime();
        this.delta = currentTime - this.current

        this.trigger('tick')

        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}