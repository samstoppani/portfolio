import * as THREE from 'three';
import { gsap } from 'gsap'

export default class Particles {
    constructor(scene, renderer, mesh, material) {
        this.scene = scene
        this.renderer = renderer
        this.mesh = mesh
        this.material = material

        this.createParticles();
    }

    createParticles() {

        this.geometry = new THREE.BufferGeometry()
        const particleCount = this.mesh.geometry.attributes.position.count

        const colors = new Float32Array(particleCount * 3)
        const randomness = new Float32Array(particleCount * 3)
        const insideColor = new THREE.Color('#30e6ff')
        const outsideColor = new THREE.Color('#1b3984')

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3

            // Color
            const mixedColor = insideColor.clone()
            const radius = Math.random() * 0.5
            mixedColor.lerp(outsideColor, radius * 1)

            colors[i3] = mixedColor.r
            colors[i3 + 1] = mixedColor.g
            colors[i3 + 2] = mixedColor.b

            // Randomness
            const randomX = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : - 1) * 1 * radius
            const randomY = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : - 1) * 1 * radius
            const randomZ = Math.pow(Math.random(), 2) * (Math.random() < 0.5 ? 1 : - 1) * 1 * radius

            randomness[i3] = randomX
            randomness[i3 + 1] = randomY
            randomness[i3 + 2] = randomZ
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.mesh.geometry.attributes.position.array, 3))
        this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const object = new THREE.Points(this.geometry, this.material)

        object.name = this.mesh.name

        object.position.x = this.mesh.position.x
        object.position.y = this.mesh.position.y
        object.position.z = this.mesh.position.z

        object.rotation.x = this.mesh.rotation.x
        object.rotation.y = this.mesh.rotation.y
        object.rotation.z = this.mesh.rotation.z

        object.scale.x = this.mesh.scale.x
        object.scale.y = this.mesh.scale.y
        object.scale.z = this.mesh.scale.z

        this.scene.add(object)

    }
}