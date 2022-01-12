import Experience from "./Experience"
import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/all'

gsap.registerPlugin(ScrollToPlugin);

export default class Content {
    constructor() {

        this.experience = new Experience()
        this.scrollbar = this.experience.scrollbar.instance
        this.sizes = this.experience.sizes

        this.firstEvent = false

        // Map section markers to scroll percentage
        this.section = {
            current: 1,
            next: 1,
            markers: {
                1: 0.033,
                2: 0.166,
                3: 0.500,
                4: 0.600,
                5: 0.96,
                6: 1
            }
        }

        this.areProjectsAnimated = false
        this.tl = gsap.timeline({ paused: true })

        this.updateContent()
    }

    navlink(scrollPercentage) {
        const scrollTop = scrollPercentage * (this.sizes.documentHeight - this.sizes.windowHeight)
        gsap.to(window, { scrollTo: scrollTop, duration: 1.5, ease: 'power2.inOut' });
    }

    updateSectionID() {

        const percentage = this.scrollbar.percentage
        const markers = this.section.markers

        switch (true) {
            case percentage <= markers[1]:
                this.section.next = 1
                break;
            case percentage < markers[2]:
                this.section.next = 2
                break;
            case percentage < markers[3]:
                this.section.next = 3
                break;
            case percentage < markers[4]:
                this.section.next = 4
                break;
            case percentage < markers[5]:
                this.section.next = 5
                break;
            case percentage < markers[6]:
                this.section.next = 6
                break;
            default:
                break;
        }

        if (this.section.current != this.section.next) {
            this.updateContent()
        }


    }

    updateContent() {

        // Set variables
        const current = this.section.current
        const next = this.section.next
        this.section.current = next

        // Toggle loader and navbar
        if (next >= 2) {
            // $('#loader').hide()
            $('.exploreNavInner').show()
            $('.exploreNavInner').css('animation', 'fadeIn 1s')
        }
        else {
            // $('#loader').show()
            $(".exploreNavInner").css('animation', 'fadeOut 0.5s')
            setTimeout(() => {
                $('.exploreNavInner').hide()
            }, 500)
        }

        // Update content
        $(".section[data-id='" + current + "']").css('animation', 'fadeOut 0.5s')
        setTimeout(() => {
            $(".section[data-id='" + current + "']").hide()
            $(".section[data-id='" + next + "']").show()
            $(".section[data-id='" + next + "']").css('animation', 'fadeIn 1s')
        }, 500)

        // Update work section
        if (this.areProjectsAnimated == false && next == 5) {
            setTimeout(() => {
                this.animateProjects()
                this.areProjectsAnimated = true
            }, 500)
        }

    }

    animateProjects() {

        const loopDuration = 20
        const projectsLength = $('.project').length
        const loopDelay = loopDuration / projectsLength

        this.tl
            .from('.project', {
                scale: 0.01,
                x: '0%',
                y: '0%',
                duration: loopDuration,
                ease: 'none',
                stagger: {
                    each: loopDelay * 2,
                },
            }, "zoom")
            .to('.projects', {
                x: 200,
                y: -200,
                duration: loopDuration,
                ease: 'none'
            }, "spread")
            .to('.project', {
                x: i => -i * 20,
                y: i => i * 20,
                duration: loopDuration,
                ease: 'none',
            }, "spread")
            .to('.project', {
                scale: i => i * 0.1,
                duration: loopDuration,
                ease: 'none',
            }, "spread")
            .to('.project', {
                x: -200,
                y: 200,
                scale: 1,
                opacity: 1,
                duration: loopDuration,
                ease: 'none',
                stagger: {
                    each: loopDelay * 10,
                    from: 'end',
                },
            }, "view")
            .to('.project', {
                opacity: 0,
                zIndex: 0,
                duration: 20,
                delay: loopDuration * 2,
                ease: 'power2.inOut',
                stagger: {
                    each: loopDelay * 10,
                    from: 'end',
                },
            }, "view")

    }

    updateProjectsAnimation() {
        if (this.section.current == 5 && this.areProjectsAnimated) {
            const animationStartPercentage = (this.section.markers[4] + 0.017)
            const animationEndPercentage = this.section.markers[5]
            const projectsPercent = ((animationStartPercentage - this.scrollbar.buffer) / (animationStartPercentage - animationEndPercentage)).toFixed(4)
            this.tl.progress(projectsPercent)
            this.tl.pause()
        }
    }


}