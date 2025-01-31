/*
    Glunzunk Engine Editor Navigation
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { camera , renderer, scene } from './init.js';

// Controls (Pointer Lock)
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => controls.lock()); // Click to enable
scene.add(controls.getObject());

// Movement Variables
const movementSpeed = 5.0;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const keyStates = {};

// Track Key Presses
document.addEventListener('keydown', (event) => keyStates[event.code] = true);
document.addEventListener('keyup', (event) => keyStates[event.code] = false);

// Movement Update
function updateControls(deltaTime) {
    if (!controls.isLocked) return; // Only move when locked

    direction.set(0, 0, 0);
    if (keyStates['KeyW']) direction.z -= 1;
    if (keyStates['KeyS']) direction.z += 1;
    if (keyStates['KeyA']) direction.x -= 1;
    if (keyStates['KeyD']) direction.x += 1;
    
    direction.normalize(); // Prevent diagonal speed boost
    direction.applyQuaternion(camera.quaternion); // Move in camera direction

    velocity.copy(direction).multiplyScalar(movementSpeed * deltaTime);
    controls.getObject().position.add(velocity);
}

// Animation Loop
const clock = new THREE.Clock();
function animate() {
    const deltaTime = clock.getDelta();
    updateControls(deltaTime);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();