import * as THREE from 'three'
import Experience from "./Experience"

export default class Scrollbar {
    constructor() {

        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
    }

    setInstance() {
        this.instance = {
            scrollTop: 0,
            percentage: 0,
            buffer: 0
        }
    }

    update() {
        this.instance.scrollTop = $(window).scrollTop()
        const scrollPercentCalc = (this.instance.scrollTop / (this.sizes.documentHeight - this.sizes.windowHeight))
        this.instance.percentage = scrollPercentCalc <= 1 ? scrollPercentCalc : 1

        // Update CSS
        document.getElementById("exploreNavLineProgress").style.transform = `scaleY(${this.instance.percentage * 18})`
    }
}