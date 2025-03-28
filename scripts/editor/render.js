/*
    Renderer for GZ
    Written by: MTSyntho
    Sep 2024
*/

import * as THREE from 'three';
import { handleCamera } from './../editor/camera.js';
import { inEngine, renderer, scene, activeCamera } from './../editor/init.js';
import { gzjs } from './../engine/glunzunk.js';
import { composer } from './../engine/gzjs/gzjs.postprocessing.js';


// const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas });
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setAnimationLoop( animate );
// document.body.appendChild( renderer.domElement );

const clock = new THREE.Clock();

// export default function animate() {

// 	// cube.rotation.x += 0.01;
// 	// cube.rotation.y += 0.01;

// 	const deltaTime = clock.getDelta();
// 	// updateControls(deltaTime);	
// 	renderer.render(scene, camera);
// 	requestAnimationFrame(animate);

// }

// gzjs.postProcessing('add', 'godrays')

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); // Get time since last frame

    if (inEngine === true) {
        handleCamera();   
    }

    composer.render(scene, activeCamera);

    // renderer.render(scene, activeCamera);
}
animate();

 // animate();