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
	
	console.log('[Scene Loader] Added Sky')

};

