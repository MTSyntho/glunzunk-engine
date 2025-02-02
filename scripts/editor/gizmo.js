import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { scene, camera, renderer } from './init.js';
import { objects } from './../default-project.js';


// Transform Controls for Gizmos
const transformControls = new TransformControls(camera, renderer.domElement);

// Click detection w/ raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;


window.addEventListener('keydown', (event) => {
    if (event.key === 'z' || event.key === '1') {
    	transformControls.setMode('translate');	// Move
    };
    if (event.key === 'x' || event.key === '2') {
    	transformControls.setMode('rotate');    // Rotate
    };
    if (event.key === 'c' || event.key === '3') {
    	transformControls.setMode('scale');     // Scale
    };
});

// Click Event Listener
window.addEventListener('pointerdown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        transformControls.attach(selectedObject); // Attach gizmo
        // scene.add(transformControls);
    } else {
	    transformControls.detach(); // Detach gizmo
	    // scene.remove(transformControls);
	};
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();