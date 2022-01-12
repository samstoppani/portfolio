import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import Scrollbar from './Scrollbar'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Content from './Content'

import sources from './sources.js'
import Resources from './Utils/Resources'

let instance = null

export default class Experience {
    constructor(canvas) {

        if (instance) {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.scrollbar = new Scrollbar()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.content = new Content()


        // Resize event 
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Tick event
        this.time.on('tick', () => {
            this.update()
        })

        // Scroll event
        window.addEventListener('scroll', () => {
            this.scrollbar.update()
            this.content.updateSectionID()
            this.content.updateProjectsAnimation()
        })

        // NavLink events
        $('.navLink').on('click', function () {
            const scrollPercentage = $(this).data("scroll-percentage")
            window.experience.content.navlink(scrollPercentage)
        })

    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
        this.world.update()
    }

}