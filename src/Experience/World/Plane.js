import * as THREE from 'three';
import { gsap } from 'gsap'
import Experience from '../Experience';
import wavyVertexShader from "../../shaders/wavy/vertex.glsl";
import wavyFragmentShader from "../../shaders/wavy/fragment.glsl";


export default class Plane {
    constructor(yPosition, textureName = null) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance
        this.resources = this.experience.resources

        this.yPosition = yPosition
        if (textureName) {
            this.textureName = textureName
            this.texture = this.resources.items[textureName]
        }

        this.create();
    }

    create() {

        // Set material
        if (this.textureName == null) {
            this.material = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000) });
        }
        else {
            this.material = new THREE.ShaderMaterial({
                vertexShader: wavyVertexShader,
                fragmentShader: wavyFragmentShader,
                side: THREE.DoubleSide,
                uniforms: {
                    uColour: { value: new THREE.Color(0xffff00) },
                    uTime: { value: 0 },
                },
            });
        }

        // If texture is available add it
        if (this.texture) {
            this.texture.wrapS = THREE.RepeatWrapping;
            this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.set(4, 4);
            this.material.uniforms.uTexture = { value: this.texture }
        }

        // Create mesh
        this.geometry = new THREE.PlaneBufferGeometry(310.7, 108, 32, 32);
        this.mesh = new THREE.Mesh(this.geometry, this.material);

        // Flip bottom banner
        if (this.textureName == 'bottomBanner') {
            this.mesh.rotation.y = Math.PI;
        }

        // Set position
        this.mesh.position.y = this.yPosition;

        // Add to scene
        this.mesh.name = this.textureName
        this.scene.add(this.mesh);

    }

}
