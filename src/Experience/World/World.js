import Experience from "../Experience";
import ParticlesFloating from './ParticlesFloating';
import ParticlesImage from './ParticlesImage';
import ParticlesModel from './ParticlesModel';
import Plane from './Plane';


export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.scrollbar = this.experience.scrollbar.instance
        this.camera = this.experience.camera
        this.content = this.experience.content

        this.isLoaded = false

        // Wait for resources to load
        this.resources.on('ready', () => {

            this.blackScreen = new Plane(0)
            this.topBanner = new Plane(54, 'topBanner')
            this.bottomBanner = new Plane(-54, 'bottomBanner')

            this.swirl = new ParticlesModel('swirl', 0)
            this.floatingParticles = new ParticlesFloating()
            this.profilePic = new ParticlesImage('profilePic', 200, 200)

            this.isLoaded = true

            this.update()

        })
    }

    update() {
        if (this.isLoaded) {

            // Update rotation of banners
            const bannerRotation = this.camera.position.current / 200
            const extraRotation = 0.8
            this.topBanner.mesh.rotation.x = -bannerRotation + extraRotation;
            this.bottomBanner.mesh.rotation.x = bannerRotation - extraRotation;

            // Update waveyness of banners
            this.topBanner.mesh.material.uniforms.uTime.value = this.time.elapsed
            this.bottomBanner.mesh.material.uniforms.uTime.value = this.time.elapsed

            // Update black screen position
            this.blackScreen.mesh.position.z = this.camera.position.current - 70;

            // Update swirl
            this.swirl.material.uniforms.uTime.value = this.time.elapsed
            this.swirl.points.rotation.y = this.time.elapsed

            // Update profile pic
            this.profilePic.update(this.time.elapsed)

            // Update floating particles
            this.floatingParticles.update(this.time.elapsed)
        }
    }
}