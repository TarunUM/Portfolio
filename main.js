import './style.css'
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import gsap from "gsap";

/*To actually be able to display anything with three.js,
we need three things: scene, camera and renderer,
so that we can render the scene with camera.*/

// 1.scene
const scene = new THREE.Scene();

let size = {
    width: window.innerWidth,
    height: window.innerHeight
}
// 2.camera
const camera = new THREE.PerspectiveCamera(50, size.width / size.height,0.1,1000);
camera.position.z = 20;
scene.add(camera);

//Point Lighting
const PointLight = new THREE.PointLight( 0xffffff ); // white light
PointLight.position.set(10,15,5)
scene.add( PointLight );
// TorusKnotGeometry
const geometry = new THREE.TorusKnotGeometry(2, 0.5, 100, 200);
const material = new THREE.MeshStandardMaterial({color: 0xffffff});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Textures
const texture = new THREE.TextureLoader().load('public/background.jpg');
// scene.background.set = '0x121212';
// scene.backgroundIntensity = 0.1;

// 3.renderer
const canvas = document.getElementsByTagName('canvas')[0];
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
const color3 = new THREE.Color("rgb(15, 15, 16)");
renderer.setClearColor(color3)
renderer.render(scene, camera);

// document.body.appendChild(renderer.domElement);

// // Controls
// const control = new OrbitControls(camera, renderer.domElement);
// control.enableDamping = true;
// control.enableZoom = false;
// control.enablePan = false;


function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    torusKnot.rotation.z += 0.01;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height);
});

// let rgb = [];
// let mousedown = false;
// window.addEventListener('mousedown', ()=> {mousedown = true;})
// window.addEventListener('mouseup', ()=> {mousedown = false;})
// window.addEventListener('mousemove', (e) => {
//     if(mousedown){
//         rgb = [
//             Math.round((e.pageY / size.height)* 255),
//             Math.round((e.pageX / size.width) * 255),
//             Math.round(150)
//         ]
//         const newColors = new THREE.Color(`rgb(${rgb.join(',')})`);
//         gsap.to(torusKnot.material.color, newColors);
//     }
// })

if ( WebGL.isWebGLAvailable() ) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
}