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
const camera = new THREE.PerspectiveCamera(70, size.width / size.height,0.1,1000);
camera.position.z = 25;
scene.add(camera);

//Point Lighting
const PointLight = new THREE.PointLight( 0xffffff ); // white light
PointLight.position.set(10,15,5)
scene.add( PointLight );

// multiple objects
const objects = [];
const spread = 1.3;
const objectCount = 10;
const colors = [0xA569BD, 0x5DADE2, 0x76D7C4, 0xF9E79F, 0x808B96, 0xA569BD, 0x5DADE2, 0x76D7C4, 0xF9E79F, 0x808B96];
for (let i = 0; i < objectCount; i++) {
    const geometry2 = new THREE.TorusKnotGeometry(1, 0.5, 100, 200);
    const material2 = new THREE.MeshStandardMaterial({color: colors[i]});
    const object = new THREE.Mesh(geometry2, material2);
    object.position.x = (Math.random() * 9 - 4) * spread;
    object.position.y = (Math.random() * 6 - 2) * spread;
    object.position.z = (Math.random() - 0.5) * spread;
    object.rotation.x = Math.random() * Math.PI;
    object.rotation.y = Math.random() * Math.PI;
    object.rotation.z = Math.random() * Math.PI;
    objects.push(object);
    scene.add(object);
}

// Textures
const texture = new THREE.TextureLoader().load('public/background.jpg');

// 3.renderer
const canvas = document.getElementsByTagName('canvas')[0];
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(size.width, size.height);
const color3 = new THREE.Color("rgb(15, 15, 16)");
renderer.setClearColor(color3, 0)
renderer.render(scene, camera);

function animate() {
    requestAnimationFrame(animate);
    objects.forEach((obj) => {
        obj.rotation.x += 0.01;
        obj.rotation.y += 0.01;
        obj.rotation.z += 0.01;
        gsap.to(obj.position, {
            duration: 1,
            x: obj.position.x + (Math.random() * 2 - 1),
            y: obj.position.y + (Math.random() * 2 - 1),
        });
    });
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width/size.height;
    camera.updateProjectionMatrix()
    renderer.setSize(size.width, size.height);
});

if ( WebGL.isWebGLAvailable() ) {
    // Initiate function or other initializations here
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
}

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    objects.forEach((obj) => {
        const objX = obj.position.x;
        const objY = obj.position.y;

        // Calculate the difference between the object's position and the mouse cursor's position
        const deltaX = (x / size.width) * 20 - 10 - objX;
        const deltaY = (y / size.height) * 20 - 10 - objY;

        // Use GSAP to animate the object towards the cursor
        gsap.to(obj.position, {
            duration: 1,
            x: objX + deltaX,
            y: -(objY + deltaY) * spread,
        });
    });
});


document.addEventListener('mouseup', (e) => {
    gsap.to(camera.position, {
        duration: 1,
        z: 15
    })
})

document.addEventListener('mousedown', (e) => {
    gsap.to(camera.position, {
        duration: 1,
        z: 10
    })
})
