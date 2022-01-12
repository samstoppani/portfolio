
import * as THREE from "three";
import randomParticleVertexShader from "./shaders/random/vertex.glsl";
import randomParticleFragmentShader from "./shaders/random/fragment.glsl";

export default () => {
    // Random Particles
    const randomParticlesGeometry = new THREE.BufferGeometry()
    const randomParticlesCount = 4000
    const positionArray = new Float32Array(randomParticlesCount * 3)
    const scaleArray = new Float32Array(randomParticlesCount)

    for (let i = 0; i < randomParticlesCount; i++) {
        positionArray[i * 3 + 0] = (Math.random() - 0.5) * 50
        positionArray[i * 3 + 1] = (Math.random() - 0.5) * 500
        positionArray[i * 3 + 2] = (Math.random() - 0.5) * 500

        scaleArray[i] = Math.random()
    }

    randomParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    randomParticlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

    // Material
    const randomParticlesMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            uSize: { value: 180 },
            uTime: { value: 0 }
        },
        vertexShader: randomParticleVertexShader,
        fragmentShader: randomParticleFragmentShader,
        transparent: true,
        depthWrite: false
    })

    // Points 
    const randomParticles = new THREE.Points(randomParticlesGeometry, randomParticlesMaterial)
    // randomParticles.position.z = -325
    randomParticles.position.z = -400
    scene.add(randomParticles)


}
