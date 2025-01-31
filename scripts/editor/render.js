/*
    Renderer for GZ
    Written by: MTSyntho
    Sep 2024
*/

import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const default clock = new THREE.Clock();
export default function animate() {

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	const deltaTime = clock.getDelta();
	// updateControls(deltaTime);	
	renderer.render(scene, camera);
	requestAnimationFrame(animate);

}

 // animate();