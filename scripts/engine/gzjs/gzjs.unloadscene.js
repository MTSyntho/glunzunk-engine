import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, renderer, gizmoObjects, sceneObjects } from './../../editor/init.js';

gzjs.unloadscene = function() {
	for (let i = scene.children.length - 1; i >= 0; i--) {
		let child = scene.children[i];
		
		child.traverse(obj => {
			if (obj.geometry) obj.geometry.dispose();
			if (obj.material) {
				if (Array.isArray(obj.material)) {
					obj.material.forEach(mat => mat.dispose());
				} else {
					obj.material.dispose();
				}
			}
		});
		scene.remove(child)
	}

	// Doesnt work on constant vars
	// gizmoObjects = [];
	// sceneObjects = {};

	gizmoObjects.length = 0;
	
	Object.keys(sceneObjects).forEach(key => {
		delete sceneObjects[key];
	});

	scene.background = null;
	scene.environment = null;

	renderer.toneMapping = THREE.NoToneMapping;
	renderer.toneMappingExposure = 1.0;
	renderer.outputColorSpace = THREE.SRGBColorSpace;

	renderer.renderLists.dispose();	
};

