/*
    Game Initilization
    Written by: MTSyntho
    Mar 2025
*/

// setTimeout(() => {
//     console.log("This runs after a 2-second delay");
// }, 2000)

// console.log("This runs after a 2-second delay");

import * as THREE from 'three';
// import { gzjs } from './../scripts/engine/glunzunk.js';
import { gzjs } from './../engine/glunzunk.js';
// import { composer } from './engine/gzjs/gzjs.postprocessing.js';
import { composer } from './../engine/gzjs/gzjs.postprocessing.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.set(0, 1, 5);  // Position the camera so it can see the scene

var inEngine = false;


const renderCanvas = document.getElementById('renderCanvas');
console.log(renderCanvas)
const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas, antialias:false });
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setPixelRatio(0.5)

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix(); 
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

const gizmoObjects = []; // Store selectable objects
const sceneObjects = {}

const sceneLights = [];

export { renderer, scene, camera, inEngine, gizmoObjects, sceneObjects, sceneLights };

document.addEventListener('DOMContentLoaded', function () {
	fetch('assets/assets.json')
		.then(response => response.json())
		.then(data => {
			Object.entries(data.images).forEach(([key, imageData]) => {
				var fileString = `assets/images/${imageData.file}`
				try {		
					gzjs.createTexture(
						key,
						fileString,
						imageData.wrapS, 
						imageData.wrapT, 
						imageData.repeat
					)
				} catch (error) {
					console.error(`Failed to import texture ${key}: ` +  error)
				}
			});
		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});	

	// Load Scene list, and add to dropdown
	fetch('scripts/scenes.json')
		.then(response => response.json())
		.then(data => {
			// Object.entries(data.scenes).forEach(([key, name]) => {

			// });

			// console.log(data.scenes[1])
			gzjs.loadscene(data.scenes[1])
		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});	

});

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); // Get time since last frame

    // gzjs.whenFrameRendered() // to trigger game loop

    if (composer) {
    	// console.log('[init.js] Composer Ready')
    	composer.render(scene, camera);
    } else {
    	console.log('[init.js] Waiting for Composer')
    }

    // renderer.render(scene, camera);
}

animate();