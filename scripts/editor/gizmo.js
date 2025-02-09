import * as THREE from 'three';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { scene, camera, renderer, gizmoObjects, sceneObjects } from './init.js';


// Transform Controls for Gizmos
const transformControls = new TransformControls(camera, renderer.domElement);

// Click detection w/ raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;

var objectSelected = false;


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
    if (event.target !== renderer.domElement) return; // Ignore clicks not on renderer
    if (transformControls.dragging) return; // Ignore clicks while dragging the gizmo

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(gizmoObjects, true);

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        transformControls.attach(selectedObject);
        scene.add(transformControls.getHelper());

        var objClickOn = new CustomEvent("objectSelected");
        objClickOn.uuid = selectedObject.uuid; // Attach uuid directly to the event
        objClickOn.obj = selectedObject

        document.dispatchEvent(objClickOn);

    } else {
        transformControls.detach();
        scene.remove(transformControls.getHelper());

        var objClickOff = new CustomEvent("objectUnselected");
        document.dispatchEvent(objClickOff);
    }
});

window.addEventListener('pointerup', (event) => {
    if (event.target !== renderer.domElement) return; // Ignore clicks not on renderer
    if (transformControls.dragging) return; // Ignore clicks while dragging the gizmo

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(gizmoObjects, true);

    if (intersects.length > 0) {
        var objClickOn = new CustomEvent("objectSelected");
        objClickOn.uuid = selectedObject.uuid; // Attach uuid directly to the event
        objClickOn.obj = selectedObject

        document.dispatchEvent(objClickOn);  
    }
});
export { objectSelected }

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();