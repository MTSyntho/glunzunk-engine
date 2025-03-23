import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, renderer, camera } from './../../editor/init.js';
import { Sky } from 'three/addons/objects/Sky.js';

gzjs.sky = function( turbidity, rayleigh, mieCoe, mieDirG, elevation, azimuth, scale, sunColor, sunIntensity, sunCastShadow ) {
	// Create Sky
	const skyBG = new Sky();
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
	sunLight.position.copy(sunPosition).multiplyScalar(100); // Move light far away
	sunLight.castShadow = sunCastShadow; // Enable shadows
	scene.add( sunLight );

	// sunLight.shadow.camera.left = -500;
	// sunLight.shadow.camera.right = 500;
	// sunLight.shadow.camera.top = 500;
	// sunLight.shadow.camera.bottom = -500;
	// sunLight.shadow.camera.near = 0.5;
	// sunLight.shadow.camera.far = 200000; // Large enough to cover distant objects
	// sunLight.shadow.camera.updateProjectionMatrix();

	// sunLight.shadow.mapSize.width = 8192;
	// sunLight.shadow.mapSize.height = 8192;


	// Sunlight Frustrum
	// const helper = new THREE.CameraHelper(sunLight.shadow.camera);
	// scene.add(helper);
	
	console.log('[Scene Loader] Added Sky')

};

