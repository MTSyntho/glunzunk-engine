import * as THREE from 'three';
import { scene, camera, renderer, sceneObjects, gizmoObjects } from './init.js';
import { transformControls, unselectObject } from './gizmo.js'

var selectedObject = null;

document.addEventListener('objectSelected', (event) => {
    selectedObject = event.obj
})

window.addEventListener('keydown', (event) => {
    if (event.key === 'Delete') {
        selectedObject.remove()
        selectedObject.geometry.dispose()
        selectedObject.material.dispose()
        scene.remove(selectedObject)

        // delete gizmoObjects[selectedObject.uuid]
        // delete sceneObjects[selectedObject.uuid]

        transformControls.detach()
        scene.remove(transformControls.getHelper())

        // Remove from gizmoObjects & sceneObjects (if they're arrays)
        if (Array.isArray(gizmoObjects)) {
            const index = gizmoObjects.findIndex(obj => obj.uuid === selectedObject.uuid);
            if (index !== -1) gizmoObjects.splice(index, 1); // ✅ Correctly removes object from array
        } else {
            delete gizmoObjects[selectedObject.uuid]; // ✅ Removes from object (if applicable)
        }

        if (Array.isArray(sceneObjects)) {
            sceneObjects = sceneObjects.filter(obj => obj.uuid !== selectedObject.uuid);
        } else {
            delete sceneObjects[selectedObject.uuid];
        }
        // console.log(gizmoObjects)

        unselectObject()

        selectedObject = null;
    };
});