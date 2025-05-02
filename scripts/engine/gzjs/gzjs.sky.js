import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, renderer, camera } from './../../editor/init.js';
import { Sky } from 'three/addons/objects/Sky.js';

gzjs.sky = function( turbidity, rayleigh, mieCoe, mieDirG, elevation, azimuth, scale, sunColor, sunIntensity, sunCastShadow ) {
	// Create Sky
	const skyBG = new Sky();
	skyBG.name = 'gzjsSky'
	skyBG.scale.setScalar( scale );
	scene.add( skyBG );


	const phi = THREE.MathUtils.degToRad( 90 - elevation );
	const theta = THREE.MathUtils.degToRad( azimuth );
	const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, phi, theta );

	const skyUniforms = skyBG.material.uniforms;
	skyUniforms['turbidity'].value = turbidity;
	skyUniforms['rayleigh'].value = rayleigh;
	skyUniforms['mieCoefficient'].value = mieCoe;
	skyUniforms['mieDirectionalG'].value = mieDirG;
	skyUniforms['sunPosition'].value = sunPosition

	// Sunlight
	const sunLight = new THREE.DirectionalLight( Number(sunColor), sunIntensity); // Bright white light
	sunLight.name = 'gzjsSunlight'
	sunLight.shadow.bias = -0.0001;
	sunLight.shadow.normalBias = 0.01;
	sunLight.position.copy(sunPosition).multiplyScalar(100); // Move light far away
	sunLight.castShadow = sunCastShadow; // Enable shadows

	// function updateSunShadowFrustum() {
	// 	// console.log(camera)
    // 	// sunLight.shadow.camera.position.copy(camera.position); 
    // 	// sunLight.shadow.camera
	//     // sunLight.shadow.camera.rotation.copy(camera.rotation);
	// 	sunLight.shadow.camera.updateProjectionMatrix();
	// 	// console.log('sdsd')
	// }

	// console.log(sunLight.shadow.camera.position, camera)

	    // Optionally, adjust the shadow camera's frustum size based on the camera's frustum
	    // Here we're using the same near and far planes as the camera's frustum
	    // sunLight.shadow.camera.near = camera.near;
	    // sunLight.shadow.camera.far = camera.far;

	// renderer.shadowMap.width = 2048;
	// renderer.shadowMap.height = 2048;
	scene.add( sunLight );

	// function getCameraFrustum(camera) {
	//     const frustum = new THREE.Frustum();
	//     const projScreenMatrix = new THREE.Matrix4();
	    
	//     // Multiply the camera's projection matrix by its world matrix to get the combined matrix
	//     camera.matrixWorldInverse.getInverse(camera.matrixWorld);
	//     projScreenMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
	    
	//     // Extract the frustum planes from the combined matrix
	//     frustum.setFromProjectionMatrix(projScreenMatrix);
	    
	//     return frustum;
	// }

	// function updateSunShadowFrustum() {
	//     const frustum = getCameraFrustum(camera);

	//     // You can adjust the sun's position based on its distance to the camera, or use an offset
	//     // Example: Let's say you want to position the sun based on the camera's position and the frustum
	//     const sunPosition = sunLight.position.clone();

	//     // You can do more complex checks here to adjust the sun's position
	//     // For simplicity, we'll just check if it's inside the frustum and move it if necessary

	//     // If the sun is outside of the frustum, adjust its position to be within the camera's view
	//     if (!frustum.intersectsSphere(new THREE.Sphere(sunPosition, 1))) {
	//         // For simplicity, just move the sun to a position within the frustum
	//         // Here we move it to a random position inside the camera's frustum for example
	//         const cameraDirection = new THREE.Vector3();
	//         camera.getWorldDirection(cameraDirection);
	        
	//         // Position the sun behind the camera, within the frustum
	//         sunPosition.add(cameraDirection.multiplyScalar(500)); // Adjust 500 based on your needs

	//         // Update the sun's position
	//         sunLight.position.copy(sunPosition);
	//     }
	// }

	// sunLight.shadow.camera.left = -500;
	// sunLight.shadow.camera.right = 500;
	// sunLight.shadow.camera.top = 500;
	// sunLight.shadow.camera.bottom = -500;
	// sunLight.shadow.camera.near = 0.5;
	// sunLight.shadow.camera.far = 200000; // Large enough to cover distant objects

	// sunLight.shadow.mapSize.width = 8192;
	// sunLight.shadow.mapSize.height = 8192;


	// Sunlight Frustrum
	// const helper = new THREE.CameraHelper(sunLight.shadow.camera);
	// scene.add(helper);
	
	// var updateShadowFrustum = setInterval(updateSunShadowFrustum, 100);

	console.log('[Scene Loader] Added Sky')
};