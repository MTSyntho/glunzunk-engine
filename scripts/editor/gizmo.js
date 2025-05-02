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
const originalSizes = new Map(); // Map <uuid, Vector3>

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

function showGizmo(state) {
    if (state == 'position') {
        transformControls.setMode('translate'); // Move
    };
    if (state == 'rotation') {
        transformControls.setMode('rotate');    // Rotate
    };
    if (state == 'scale') {
        transformControls.setMode('scale');     // Scale
    };
};

window.showGizmo = showGizmo
// Click Event Listener
window.addEventListener('pointerdown', (event) => {
    if (event.target !== renderer.domElement) return; // Ignore clicks not on renderer
    if (transformControls.dragging) return; // Ignore clicks while dragging the gizmo

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(gizmoObjects, true);

    console.log(gizmoObjects)
    console.log(intersects)

    if (intersects.length > 0) {
        selectedObject = intersects[0].object;
        if (selectedObject.geometry instanceof THREE.BoxGeometry) {
            const size = new THREE.Vector3();
            selectedObject.geometry.boundingBox?.getSize(size);
            
            if (!selectedObject.geometry.boundingBox) {
                selectedObject.geometry.computeBoundingBox();
                selectedObject.geometry.boundingBox.getSize(size);
            }

            originalSizes.set(selectedObject.uuid, size.clone());
        }


        if (selectedObject.userData.isCameraHitbox) {
            selectedObject = scene.getObjectByName(selectedObject.userData.cameraName); // Get the real camera
        }

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

transformControls.addEventListener('mouseUp', () => {
    if (!selectedObject) return;

    if (
        selectedObject.geometry instanceof THREE.BoxGeometry &&
        originalSizes.has(selectedObject.uuid)
    ) {
        const baseSize = originalSizes.get(selectedObject.uuid);
        const newScale = selectedObject.scale;

        const newSize = new THREE.Vector3().copy(baseSize).multiply(newScale);

        selectedObject.geometry.dispose();
        selectedObject.geometry = new THREE.BoxGeometry(newSize.x, newSize.y, newSize.z);

        selectedObject.scale.set(1, 1, 1);

        originalSizes.set(selectedObject.uuid, newSize.clone());
    }
});

function unselectObject() {
    // transformControls.detach();
    // scene.remove(transformControls.getHelper());

    var objClickOff = new CustomEvent("objectUnselected");
    document.dispatchEvent(objClickOff); 
};

export { objectSelected, transformControls, unselectObject }

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();