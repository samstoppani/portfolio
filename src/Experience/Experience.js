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

import { Howl } from 'howler';
import music from "../assets/audio/2.mp3";

import { gsap } from 'gsap'
import { CSSPlugin } from 'gsap/all'

gsap.registerPlugin(CSSPlugin);


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

        // if (!this.firstEvent) {
        //     this.music = {
        //         audio: new Howl({
        //             src: [music],
        //             volume: 0.5,
        //             autoplay: false,
        //             loop: true
        //         }),
        //         tween: gsap.to(".bar", {
        //             height: "100%",
        //             duration: 1,
        //             ease: 'none',
        //             yoyo: true,
        //             stagger: {
        //                 each: 0.2,
        //                 from: 'edges',
        //                 yoyo: true,
        //                 repeat: -1,
        //             }
        //         })
        //     }

        //     this.firstEvent = true
        //     this.music.audio.play()
        // }


        // this.tween = {
        //     mute: gsap.to(".bar", {
        //         height: "20%",
        //         duration: 1,
        //         ease: 'none',
        //         repeat: -1,
        //     }),
        //     unmute: gsap.to(".bar", {
        //         height: "100%",
        //         duration: 1,
        //         ease: 'none',
        //         yoyo: true,
        //         stagger: {
        //             each: 0.2,
        //             from: 'edges',
        //             yoyo: true,
        //             repeat: -1,
        //         }
        //     })
        // }


        // Set scrollbar to top of page on load
        $(document).ready(function () {
            gsap.to(window, { scrollTo: 0, duration: 2, ease: 'power2.inOut' });
        })


        // Start experience
        document.getElementById("enterBtn").addEventListener("click", () => {

            if (!this.content.firstEvent) {
                this.music = {
                    audio: new Howl({
                        src: [music],
                        volume: 0.5,
                        autoplay: false,
                        loop: true
                    }),
                    tween: gsap.to(".bar", {
                        height: "100%",
                        duration: 1,
                        ease: 'none',
                        yoyo: true,
                        stagger: {
                            each: 0.2,
                            from: 'edges',
                            yoyo: true,
                            repeat: -1,
                        }
                    })
                }

                this.content.firstEvent = true
                this.music.audio.play()
                this.scrollbar.update()
                this.content.updateSectionID()
            }

        });


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

            if (this.content.firstEvent) {
                this.scrollbar.update()
                this.content.updateSectionID()
                this.content.updateProjectsAnimation()
            }
        })

        // NavLink events
        $('.navLink').on('click', function () {
            const scrollPercentage = $(this).data("scroll-percentage")
            window.experience.content.navlink(scrollPercentage)
        })


        // Turn music on/off
        $('#musicBtn').on('click', function () {

            // On
            if (window.experience.music.audio.mute()) {
                window.experience.music.audio.fade(0, 0.5, 200)
                window.experience.music.audio.mute(false)

                window.experience.music.tween.resume()
            }
            // Off
            else {
                window.experience.music.audio.fade(0.5, 0, 200)
                window.experience.music.audio.mute(true)

                window.experience.music.tween.pause()
            }
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