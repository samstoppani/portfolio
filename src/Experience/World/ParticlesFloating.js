import * as THREE from 'three';
import { gsap } from 'gsap'
import Experience from '../Experience';

import floatingParticlesVertexShader from "../../shaders/floating/vertex.glsl";
import floatingParticlesFragmentShader from "../../shaders/floating/fragment.glsl";


const easeOutSine = (t, b, c, d) => {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
};

export default class ParticlesFloating {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources

        this.count = 4000;

        this.create()

    }

    create() {

        this.geometry = new THREE.BufferGeometry()
        const positionArray = new Float32Array(this.count * 3)
        const scaleArray = new Float32Array(this.count)

        for (let i = 0; i < this.count; i++) {
            positionArray[i * 3 + 0] = (Math.random() - 0.5) * 100
            positionArray[i * 3 + 1] = (Math.random() - 0.5) * 500
            positionArray[i * 3 + 2] = (Math.random() - 0.5) * 500

            scaleArray[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

        // Material
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
                uSize: { value: 180 },
                uTime: { value: 0 }
            },
            vertexShader: floatingParticlesVertexShader,
            fragmentShader: floatingParticlesFragmentShader,
            transparent: true,
            depthWrite: false
        })

        // Points 
        this.points = new THREE.Points(this.geometry, this.material)
        this.points.position.z = -400
        this.scene.add(this.points)

    }

    update(elapsedTime) {
        this.material.uniforms.uTime.value = elapsedTime
        this.points.rotation.x = elapsedTime * 0.1
    }

}
