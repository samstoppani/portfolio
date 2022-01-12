import * as THREE from 'three'
import Experience from "./Experience"

export default class Camera {
    constructor() {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.scrollbar = this.experience.scrollbar.instance

        this.position = {
            current: 100,
            start: 100,
            end: -700,
            delta: 0
        }

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            76,
            this.sizes.width / this.sizes.height,
            0.1,
            1000
        )
        this.instance.position.set(0, 0, 100)
        this.scene.add(this.instance)
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        const scrollBufferDistance = this.scrollbar.percentage - this.scrollbar.buffer
        this.scrollbar.buffer += 0.05 * scrollBufferDistance
        this.position.current = this.position.start + (this.position.end * this.scrollbar.buffer)
        this.instance.position.z = this.position.current;
    }

}