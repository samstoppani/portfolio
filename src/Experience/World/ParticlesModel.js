import * as THREE from 'three';
import Experience from '../Experience';
import staticParticleVertexShader from "../../shaders/staticParticles/vertex.glsl";
import staticParticleFragmentShader from "../../shaders/staticParticles/fragment.glsl";

export default class ParticlesModel {
    constructor(modelName, meshIndex) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources

        this.modelName = modelName
        this.meshIndex = meshIndex

        this.setMaterial()
        this.create();
    }


    setMaterial() {

        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true, // Adds the color attribute to vertex.glsl
            vertexShader: staticParticleVertexShader,
            fragmentShader: staticParticleFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uSize: { value: 8 * this.renderer.getPixelRatio() },
            }
        })

        this.geometry = new THREE.BufferGeometry()
        this.mesh = this.resources.items[this.modelName].scene.children[this.meshIndex]

    }

    create() {

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

        this.points = new THREE.Points(this.geometry, this.material)

        this.points.name = this.mesh.name

        this.points.position.x = this.mesh.position.x
        this.points.position.y = this.mesh.position.y
        this.points.position.z = this.mesh.position.z

        this.points.rotation.x = this.mesh.rotation.x
        this.points.rotation.y = this.mesh.rotation.y
        this.points.rotation.z = this.mesh.rotation.z

        this.points.scale.x = this.mesh.scale.x
        this.points.scale.y = this.mesh.scale.y
        this.points.scale.z = this.mesh.scale.z

        this.scene.add(this.points)

    }
}