/*
    Editor Initilization
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
import { gzjs } from './../engine/glunzunk.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
// import animate from '/scripts/editor/render.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
const gamecamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas, antialias:true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

// const camera = gzjs.newCamera( 60, scene, 	window.innerWidth / window.innerHeight, 0.1, 1000 );
// export { scene, renderer, camera };	

// Function to handle window resizing
function onWindowResize() {
    // Update the camera's aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();  // Update the camera's projection matrix
    
    // Update the renderer's size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Listen for the window resize event
window.addEventListener('resize', onWindowResize, false);

camera.position.y = 1;
camera.position.z = 5;

gamecamera.position.y = 3;
gamecamera.position.z = 3;

let activeCamera = camera; // Default to editor camera

// const transformControls = new TransformControls(camera, renderer.domElement);
// scene.add(transformControls);

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
const gizmoObjects = []; // Store selectable objects


// // Handle Mouse Clicks
// window.addEventListener('click', (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, activeCamera);
//     const intersects = raycaster.intersectObjects(gizmoObjects);

//     if (intersects.length > 0) {
//         transformControls.attach(intersects[0].object);
//     } else {
//         transformControls.detach();
//     }
// });



function animate() {
	// requestAnimationFrame(animate);
	renderer.render( scene, activeCamera );
}

animate();

export { scene, renderer, camera, gamecamera, activeCamera, gizmoObjects };