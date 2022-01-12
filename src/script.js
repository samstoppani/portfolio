import "./style.css";
import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))






















// import "./style.css";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

// import wavyVertexShader from "./shaders/wavy/vertex.glsl";
// import wavyFragmentShader from "./shaders/wavy/fragment.glsl";

// import particleVertexShader from "./shaders/particles/vertex.glsl";
// import particleFragmentShader from "./shaders/particles/fragment.glsl";

// import staticParticleVertexShader from "./shaders/staticParticles/vertex.glsl";
// import staticParticleFragmentShader from "./shaders/staticParticles/fragment.glsl";

// import randomParticleVertexShader from "./shaders/floating/vertex.glsl";
// import randomParticleFragmentShader from "./shaders/floating/fragment.glsl";

// import Particles from "./Particles";
// import ParticlesImage from "./ParticlesImage";

// import { gsap } from "gsap";
// import { ScrollToPlugin } from 'gsap/all'

// gsap.registerPlugin(ScrollToPlugin);

// // Variables 

// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     documentHeight: $(document).height(),
//     windowHeight: $(window).height()
// };

// const scrollTop = $(window).scrollTop()
// const scrollPercentage = (scrollTop / (sizes.documentHeight - sizes.windowHeight));

// const scroll = {
//     top: scrollTop,
//     percentage: scrollPercentage,
//     buffer: scrollPercentage
// }
// const cameraPos = {
//     current: 100,
//     delta: 0,
//     start: 100,
//     end: -500
// }
// const section = {
//     current: 1,
//     next: 1
// }
// const sectionMarkers = {
//     1: 0.033,
//     2: 0.166,
//     3: 0.566,
//     4: 0.733,
//     5: 0.900,
//     6: 1
// }

// let allowScroll = false
// let bannerRotation = 0
// let areProjectsAnimated = false


// // Texture loader
// const loadingManager = new THREE.LoadingManager(
//     () => {
//         updateContent()
//         allowScroll = true
//     },

//     (itemUrl, itemsLoaded, itemsTotal) => {
//         const progress = itemsLoaded / itemsTotal
//     }
// );
// const textureLoader = new THREE.TextureLoader(loadingManager);

// // Draco loader
// const dracoLoader = new DRACOLoader(loadingManager);
// dracoLoader.setDecoderPath("draco/");

// // GLTF loader
// const gltfLoader = new GLTFLoader(loadingManager);
// gltfLoader.setDRACOLoader(dracoLoader);

// // Debug
// const gui = new dat.GUI({
//     // closed: true
// })

// // Canvas
// const canvas = document.querySelector("canvas.webgl");

// // Scene
// const scene = new THREE.Scene();


// /**
//  * Re-size
//  */
// window.addEventListener("resize", () => {
//     // Update sizes
//     sizes.width = window.innerWidth;
//     sizes.height = window.innerHeight;

//     // Update camera
//     camera.aspect = sizes.width / sizes.height;
//     camera.updateProjectionMatrix();

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// });

// /**
//  * Camera
//  */
// // Base camera
// const camera = new THREE.PerspectiveCamera(
//     75,
//     sizes.width / sizes.height,
//     0.1,
//     1000
// );
// camera.position.set(0, 0, 100)
// scene.add(camera);

// /**
//  * Renderer
//  */
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas,
//     // alpha: true,
// });
// renderer.setSize(sizes.width, sizes.height);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));




// // Random Particles
// const randomParticlesGeometry = new THREE.BufferGeometry()
// const randomParticlesCount = 4000
// const positionArray = new Float32Array(randomParticlesCount * 3)
// const scaleArray = new Float32Array(randomParticlesCount)

// for (let i = 0; i < randomParticlesCount; i++) {
//     positionArray[i * 3 + 0] = (Math.random() - 0.5) * 50
//     positionArray[i * 3 + 1] = (Math.random() - 0.5) * 500
//     positionArray[i * 3 + 2] = (Math.random() - 0.5) * 500

//     scaleArray[i] = Math.random()
// }

// randomParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
// randomParticlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// // Material
// const randomParticlesMaterial = new THREE.ShaderMaterial({
//     uniforms: {
//         uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
//         uSize: { value: 180 },
//         uTime: { value: 0 }
//     },
//     vertexShader: randomParticleVertexShader,
//     fragmentShader: randomParticleFragmentShader,
//     transparent: true,
//     depthWrite: false
// })

// // Points 
// const randomParticles = new THREE.Points(randomParticlesGeometry, randomParticlesMaterial)
// // randomParticles.position.z = -325
// randomParticles.position.z = -400
// scene.add(randomParticles)











// // Objects
// const topTexture = textureLoader.load("textures/Top.png");
// topTexture.wrapS = THREE.RepeatWrapping;
// topTexture.wrapT = THREE.RepeatWrapping;
// topTexture.repeat.set(4, 4);

// const bottomTexture = textureLoader.load("textures/Bottom.png");
// bottomTexture.wrapS = THREE.RepeatWrapping;
// bottomTexture.wrapT = THREE.RepeatWrapping;
// bottomTexture.repeat.set(4, 4);

// let geometry = new THREE.PlaneBufferGeometry(310.7, 108, 32, 32);

// let material1 = new THREE.ShaderMaterial({
//     vertexShader: wavyVertexShader,
//     fragmentShader: wavyFragmentShader,
//     side: THREE.DoubleSide,
//     uniforms: {
//         uColour: { value: new THREE.Color(0xffff00) },
//         uTime: { value: 0 },
//         uTexture: { value: topTexture },
//     },
// });

// let material2 = new THREE.ShaderMaterial({
//     vertexShader: wavyVertexShader,
//     fragmentShader: wavyFragmentShader,
//     side: THREE.DoubleSide,
//     uniforms: {
//         uColour: { value: new THREE.Color(0xffff00) },
//         uTime: { value: 0 },
//         uTexture: { value: bottomTexture },
//     },
// });

// let material3 = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x000000) });

// let particleMaterial = new THREE.ShaderMaterial({
//     depthWrite: false,
//     blending: THREE.AdditiveBlending,
//     vertexColors: true, // Adds the color attribute to vertex.glsl
//     vertexShader: particleVertexShader,
//     fragmentShader: particleFragmentShader,
//     uniforms: {
//         uTime: { value: 0 },
//         uSize: { value: 8 * renderer.getPixelRatio() },
//     },
// });

// let staticParticleMaterial = new THREE.ShaderMaterial({
//     depthWrite: false,
//     blending: THREE.AdditiveBlending,
//     vertexColors: true, // Adds the color attribute to vertex.glsl
//     vertexShader: staticParticleVertexShader,
//     fragmentShader: staticParticleFragmentShader,
//     // vertexShader: randomParticleVertexShader,
//     // fragmentShader: randomParticleFragmentShader,
//     uniforms: {
//         uTime: { value: 0 },
//         uSize: { value: 8 * renderer.getPixelRatio() },
//     },
// });

// const topBanner = new THREE.Mesh(geometry, material1);
// const bottomBanner = new THREE.Mesh(geometry, material2);
// const blackPlane = new THREE.Mesh(geometry, material3);

// topBanner.position.y = 108 / 2;
// bottomBanner.position.y = -108 / 2;

// bottomBanner.rotation.y = Math.PI;
// scene.add(topBanner, bottomBanner);
// scene.add(blackPlane);


// console.log(topBanner)


// let swirl;
// gltfLoader.load("models/swirl.glb", (gltf) => {

//     // Create particles and add each to the scene
//     gltf.scene.children.forEach(function (child) {
//         if (child.name == 'Swirl') {
//             swirl = new Particles(scene, renderer, child, staticParticleMaterial)
//             swirl = scene.getObjectByName(swirl.mesh.name)
//         }

//     });
// });

// // About Section
// let particlesImage = new ParticlesImage(scene, textureLoader, './textures/me.png')
// particlesImage.createParticles(200, 200)


// // Work Section
// let tl = gsap.timeline()

// const animateProjects = () => {

//     const loopDuration = 20
//     const projectsLength = $('.project').length
//     const loopDelay = loopDuration / projectsLength

//     tl
//         .from('.project', {
//             scale: 0.01,
//             x: '0%',
//             y: '0%',
//             duration: loopDuration,
//             ease: 'none',
//             stagger: {
//                 each: loopDelay * 2,
//             },
//         }, "zoom")
//         .to('.projects', {
//             x: 200,
//             y: -200,
//             duration: loopDuration,
//             ease: 'none'
//         }, "spread")
//         .to('.project', {
//             x: i => -i * 20,
//             y: i => i * 20,
//             duration: loopDuration,
//             ease: 'none',
//         }, "spread")
//         .to('.project', {
//             scale: i => i * 0.1,
//             duration: loopDuration,
//             ease: 'none',
//         }, "spread")
//         .to('.project', {
//             x: -200,
//             y: 200,
//             scale: 1,
//             opacity: 1,
//             duration: loopDuration,
//             ease: 'none',
//             stagger: {
//                 each: loopDelay * 10,
//                 from: 'end',
//             },
//         }, "view")
//         .to('.project', {
//             opacity: 0,
//             zIndex: 0,
//             duration: 20,
//             delay: loopDuration * 2,
//             ease: 'power2.inOut',
//             stagger: {
//                 each: loopDelay * 10,
//                 from: 'end',
//             },
//         }, "view")


// }


// /**
//  * Interactivity
//  */

// window.addEventListener('scroll', () => {

//     // Update scroll percentage
//     scroll.top = $(window).scrollTop()
//     const scrollPercentCalc = (scroll.top / (sizes.documentHeight - sizes.windowHeight))
//     scroll.percentage = scrollPercentCalc <= 1 ? scrollPercentCalc : 1

//     // Update content
//     updateSectionID()
//     if (section.current != section.next) {
//         updateContent()
//     }

//     // Update work animation
//     if (section.current == 5 && areProjectsAnimated) {
//         // const projectsPercent = ((0.75 - scroll.percentage) / (0.75 - 1)).toFixed(4)
//         const projectsPercent = (((sectionMarkers[4] + 0.017) - scroll.percentage) / ((sectionMarkers[4] + 0.017) - sectionMarkers[5])).toFixed(4)
//         tl.progress(projectsPercent)
//         tl.pause()
//     }
// })

// /**
//  * Animate
//  */
// const clock = new THREE.Clock();
// let previousTime;
// let elapsedTime;
// const tick = () => {
//     previousTime = elapsedTime;
//     elapsedTime = clock.getElapsedTime();
//     const deltaTime = elapsedTime - previousTime;

//     if (material1 && particleMaterial && swirl) {
//         // Update material shaders
//         material1.uniforms.uTime.value = elapsedTime;
//         material2.uniforms.uTime.value = elapsedTime;
//         particlesImage.particles.material.uniforms.uTime.value = elapsedTime

//         // Update swirl animtion
//         swirl.material.uniforms.uTime.value = elapsedTime
//         swirl.rotation.y = elapsedTime
//     }

//     // Update random particles 
//     randomParticlesMaterial.uniforms.uTime.value = elapsedTime
//     randomParticles.rotation.x = elapsedTime * 0.1


//     // Update camera position
//     const scrollBufferDistance = scroll.percentage - scroll.buffer
//     scroll.buffer += 0.05 * scrollBufferDistance
//     cameraPos.current = cameraPos.start + (cameraPos.end * scroll.buffer)
//     camera.position.z = cameraPos.current;
//     // cameraPos.current += cameraPos.delta;
//     // cameraPos.delta *= 0.95;

//     // Update banner rotation
//     bannerRotation = cameraPos.current / 200
//     const extraRotation = 0.8
//     topBanner.rotation.x = -bannerRotation + extraRotation;
//     bottomBanner.rotation.x = bannerRotation - extraRotation;

//     // Update black plane
//     blackPlane.position.z = cameraPos.current - 70;

//     // Update progress
//     document.getElementById("exploreNavLineProgress").style.transform = `scaleY(${scroll.percentage * 18})`

//     // Update profile image
//     particlesImage.updateParticles(elapsedTime)

//     // Render
//     renderer.render(scene, camera);

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick);
// };



// // JavaScript
// $(document).ready(function () {

//     // Update camera position on navbar click
//     $('.navLink').on('click', function () {

//         const scrollTop = $(this).data("scroll-percentage") * (sizes.documentHeight - sizes.windowHeight)
//         gsap.to(window, { scrollTo: scrollTop, duration: 1.5, ease: 'power2.inOut' });

//         $(".section[data-id='" + section.current + "']").css('animation', 'fadeOut 0.5s')
//         setTimeout(() => {
//             $(".section[data-id='" + section.current + "']").hide()
//         }, 500)

//         setTimeout(() => {
//             updateSectionID()
//             updateContent()
//         }, 1500)
//     })

// })

// const updateSectionID = () => {

//     switch (true) {
//         case scroll.percentage <= sectionMarkers[1]:
//             section.next = 1
//             break;
//         case scroll.percentage < sectionMarkers[2]:
//             section.next = 2
//             break;
//         case scroll.percentage < sectionMarkers[3]:
//             section.next = 3
//             break;
//         case scroll.percentage < sectionMarkers[4]:
//             section.next = 4
//             break;
//         case scroll.percentage < sectionMarkers[5]:
//             section.next = 5
//             break;
//         case scroll.percentage < sectionMarkers[6]:
//             section.next = 6
//             break;
//         default:
//             break;
//     }

// }

// const updateContent = () => {

//     // Set variables
//     const current = section.current
//     const next = section.next
//     section.current = section.next

//     console.log(section.next)
//     console.log(scroll.percentage)

//     // Toggle loader and navbar
//     if (next >= 2) {
//         // $('#loader').hide()
//         $('.exploreNavInner').show()
//         $('.exploreNavInner').css('animation', 'fadeIn 1s')
//     }
//     else {
//         // $('#loader').show()
//         $(".exploreNavInner").css('animation', 'fadeOut 0.5s')
//         setTimeout(() => {
//             $('.exploreNavInner').hide()
//         }, 500)
//     }

//     // Update content
//     $(".section[data-id='" + current + "']").css('animation', 'fadeOut 0.5s')
//     setTimeout(() => {
//         $(".section[data-id='" + current + "']").hide()
//         $(".section[data-id='" + next + "']").show()
//         $(".section[data-id='" + next + "']").css('animation', 'fadeIn 1s')
//     }, 500)

//     // Update particle image 
//     if (next == 4) {
//         particlesImage.show()
//     }
//     else {
//         particlesImage.hide()
//     }

//     // Update work section
//     if (areProjectsAnimated == false && next == 5) {
//         setTimeout(() => {
//             animateProjects()
//             areProjectsAnimated = true
//         }, 500)
//     }

// }


// // Start ThreeJS
// tick();
