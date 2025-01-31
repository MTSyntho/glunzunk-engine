/*
    Editor Initilization
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
// import animate from '/scripts/editor/render.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

export { scene, camera , renderer };

const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

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

function animate() {
	renderer.render( scene, camera );
}
animate();