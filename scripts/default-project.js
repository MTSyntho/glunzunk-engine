import * as THREE from 'three';
import { scene, camera, renderer } from './editor/init.js';

// const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas });
// const scene = new THREE.Scene();

// Create a Sky
import { Sky } from 'three/addons/objects/Sky.js';

const sky = new Sky();
sky.scale.setScalar( 450000 );
scene.add( sky );

const skyUniforms = sky.material.uniforms;
skyUniforms['turbidity'].value = 11.4;
skyUniforms['rayleigh'].value = 3;
skyUniforms['mieCoefficient'].value = 0.004;
skyUniforms['mieDirectionalG'].value = 0.619;

const phi = THREE.MathUtils.degToRad( 90 - 17 );
const theta = THREE.MathUtils.degToRad( 180 );
const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, phi, theta );

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;

sky.material.uniforms.sunPosition.value = sunPosition;

// Objects 
const ground = new THREE.Mesh( new THREE.BoxGeometry( 10, 0.05 , 10 ), new THREE.MeshBasicMaterial({ color: 0x2e9c24 }));
const cube = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial({ color: 0x633eb5 }) );
scene.add( cube );
scene.add( ground );

cube.position.y = 0.5;
scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );

// Sunlight
const sunLight = new THREE.DirectionalLight(0xffffff, 2); // Bright white light
sunLight.position.copy(sunPosition).multiplyScalar(100); // Move light far away
sunLight.castShadow = true; // Enable shadows
scene.add( sunLight );


function animate() {
	requestAnimationFrame(animate);
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();