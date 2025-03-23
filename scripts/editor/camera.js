/*
    Glunzunk Engine Editor Navigation
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
// import { FlyControls } from 'three/addons/controls/FlyControls.js';
import { focusedWindows } from './windows.js';
import { camera , renderer, scene } from './init.js';

var moveSpeed = 5;
var rotateSpeed = 1;
var zoomSpeed = 0.1;

var keys = {};
var usePointerLock = false;

// Movement Stuff
// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 5; // Speed of movement
// flyControls.rollSpeed = Math.PI / 2; // Rotation speed
// flyControls.dragToLook = true; // Enable mouse look

// // Track Key Presses
// document.addEventListener('keydown', (event) => keyStates[event.code] = true);
// document.addEventListener('keyup', (event) => keyStates[event.code] = false);

// // Movement Update
// function updateControls(deltaTime) {
//     if (!controls.isLocked) return; // Only move when locked

//     direction.set(0, 0, 0);
//     if (keyStates['KeyW']) direction.z -= 1;
//     if (keyStates['KeyS']) direction.z += 1;
//     if (keyStates['KeyA']) direction.x -= 1;
//     if (keyStates['KeyD']) direction.x += 1;
    
//     direction.normalize(); // Prevent diagonal speed boost
//     direction.applyQuaternion(camera.quaternion); // Move in camera direction

//     velocity.copy(direction).multiplyScalar(movementSpeed * deltaTime);
//     controls.getObject().position.add(velocity);
// }

document.addEventListener('keydown', (event) => keys[event.code] = true);
document.addEventListener('keyup', (event) => keys[event.code] = false);
// document.addEventListener('wheel', zoomCamera, { passive: false });
// document.addEventListener('click', requestPointerLock);

// Animation Loop
// function animate() {
//     requestAnimationFrame(animate);

//     // flyControls.update(delta); // Update FlyControls
//     // handleCamera()
    
//     renderer.render(scene, camera);
// }

// animate();

const clock = new THREE.Clock();

function handleCamera() {
	console.log('hi')
	if (focusedWindows.length !== 0) return;

	var moveVector = new THREE.Vector3();

	var direction = new THREE.Vector3();
	camera.getWorldDirection(direction);
	direction.y = 0;
	direction.normalize();

	var right = new THREE.Vector3();
	right.crossVectors(camera.up, direction).normalize();
	
	var delta = clock.getDelta()

	if (keys['KeyW']) moveVector.addScaledVector(direction, moveSpeed * delta)
	if (keys['KeyA']) moveVector.addScaledVector(right, moveSpeed * delta)
	if (keys['KeyS']) moveVector.addScaledVector(direction, -moveSpeed * delta)
	if (keys['KeyD']) moveVector.addScaledVector(right, -moveSpeed * delta)

	if (keys['KeyE'] || keys['Space']) moveVector.y += moveSpeed * delta;
	if (keys['KeyQ'] || keys['ShiftLeft'] || keys['ShiftRight']) moveVector.y -= moveSpeed * delta;

	camera.position.add(moveVector)

	if (keys['ArrowLeft']) camera.rotation.y += rotateSpeed * delta;
	if (keys['ArrowRight']) camera.rotation.y -= rotateSpeed * delta;
	if (keys['ArrowUp']) camera.rotation.x += rotateSpeed * delta;
	if (keys['ArrowDown']) camera.rotation.x -= rotateSpeed * delta;

	moveVector.applyQuaternion(camera.quaternion); // idk what a quaternion is but it seems cool
	camera.rotation.z += 0; // no weird z axis rotation (camera rolling)
}

export { handleCamera }