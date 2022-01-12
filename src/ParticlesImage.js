import * as THREE from 'three';
import { gsap } from 'gsap'

import particleVertexShader from "./shaders/particlesImage/vertex.glsl";
import particleFragmentShader from "./shaders/particlesImage/fragment.glsl";


const easeOutSine = (t, b, c, d) => {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
};

export default class ParticlesImage {
    constructor(scene, textureLoader, src) {
        this.scene = scene
        this.textureLoader = textureLoader
        this.vertexShader = particleVertexShader
        this.fragmentShader = particleFragmentShader
        this.src = src

        this.size = 5;

        this.disperseDirection = 'in'
        this.dispersion = 100;

        this.hidden = true

        this.initTexture();
    }

    initTexture() {

        this.particleTexture = this.textureLoader.load(this.src)

        // this.touchCanvas = document.createElement('canvas');
        // this.touchCanvas.width = this.touchCanvas.height = this.size;
        // this.ctx = this.touchCanvas.getContext('2d');
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.touchCanvas.width, this.touchCanvas.height);

        // this.touchTexture = new THREE.Texture(this.touchCanvas);

        // this.touchCanvas.id = 'touchTexture';
        // this.touchCanvas.style.width = this.touchCanvas.style.height = `${this.touchCanvas.width}px`;
        // this.touchCanvas.style.display = 'block'
        // this.touchCanvas.style.position = 'fixed'
        // this.touchCanvas.style.zIndex = 100

        // document.getElementById('body').appendChild(this.touchCanvas)

    }

    createParticles(width, height) {

        const particleCount = width * height
        const geometry = new THREE.InstancedBufferGeometry();

        // positions
        const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
        positions.setXYZ(0, -0.5, 0.5, 0.0);
        positions.setXYZ(1, 0.5, 0.5, 0.0);
        positions.setXYZ(2, -0.5, -0.5, 0.0);
        positions.setXYZ(3, 0.5, -0.5, 0.0);
        geometry.setAttribute('position', positions);

        // uvs
        const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
        uvs.setXYZ(0, 0.0, 0.0);
        uvs.setXYZ(1, 1.0, 0.0);
        uvs.setXYZ(2, 0.0, 1.0);
        uvs.setXYZ(3, 1.0, 1.0);
        geometry.setAttribute('uv', uvs);

        // index
        geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));

        const indices = new Uint16Array(particleCount);
        const offsets = new Float32Array(particleCount * 3);
        const angles = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {

            offsets[i * 3 + 0] = i % width;
            offsets[i * 3 + 1] = Math.floor(i / width);

            indices[i] = i;

            angles[i] = Math.random() * Math.PI;
        }

        geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1, false));
        geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
        geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1, false));

        const uniforms = {
            uTime: { value: 0 },
            uRandom: { value: 1.0 },
            uDepth: { value: 2.0 },
            uSize: { value: 0 },
            uTextureSize: { value: new THREE.Vector2(width, height) },
            uTexture: { value: this.particleTexture },
            uTouch: { value: this.touchTexture },
            uDispersion: { value: this.dispersion }
        };

        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            depthTest: false,
            blending: THREE.AdditiveBlending,
            // vertexColors: true,
            transparent: true
        });

        this.particles = new THREE.Mesh(geometry, material)
        this.particles.name = 'particlesImage'
        // this.particles.position.z = -200
        // this.particles.position.x = 50
        this.particles.position.set(0, -40, -400)
        this.particles.rotation.y = -0.3
        this.particles.scale.set(0.5, 0.5, 0.5)
        this.scene.add(this.particles)

        this.hide()

    }


    updateParticles(elapsedTime) {

        // Clear canvas
        // this.ctx.fillStyle = 'black';
        // this.ctx.fillRect(0, 0, this.touchCanvas.width, this.touchCanvas.height);

        // // Update age points
        // this.touchTrail.forEach((point, i) => {
        //     point.age++;
        //     // Remove old
        //     if (point.age > this.maxAge) {
        //         this.touchTrail.splice(i, 1);
        //     }
        // });

        // Update dispersion
        if (this.disperseDirection == 'in') {
            this.dispersion > 0 ? this.dispersion -= 1 : this.dispersion = 0
        }
        else {
            this.dispersion += 1
        }

        // console.log(this.dispersion)

        // Update texture
        // this.touchTexture.needsUpdate = true;
        this.particles.material.uniforms.uTime.value = elapsedTime
        this.particles.material.uniforms.uTouch.value = this.touchTexture
        this.particles.material.uniforms.uDispersion.value = this.dispersion


    }

    show() {
        if (this.hidden) {
            this.hidden = false
            this.disperseDirection = 'in'
            this.dispersion = 100
            gsap.to(this.particles.material.uniforms.uSize, { value: this.size, duration: 1.5, ease: 'power2.out' })
        }
    }

    hide() {
        if (!this.hidden) {
            this.hidden = true
            this.disperseDirection = 'out'
            gsap.to(this.particles.material.uniforms.uDispersion, { value: 100, duration: 1.5, ease: 'power2.out' })
            gsap.to(this.particles.material.uniforms.uSize, { value: 0, delay: 1, duration: 1.5, ease: 'power2.out' })
        }
    }

    destroyParticles() {
        this.disperseDirection = 'out'

        var self = this;
        setTimeout(function () {
            const image = self.scene.getObjectByName("particlesImage")
            self.scene.remove(image)

            self.disperseDirection = 'in'
        }, 1500)
    }

}