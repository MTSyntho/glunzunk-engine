// File removed from project due to returning
// init.js:15 Uncaught TypeError: gzjs.newCamera is not a function
//     at init.js:15:21
// Too many times

import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene } from './../../editor/init.js';

var camera = null;

gzjs.newCamera = function(type, scene, fov, aspectratio, nearplane, farplane) {
	if (type == 'perspective') {
		camera = new THREE.PerspectiveCamera( fov, aspectratio, nearplane, farplane );
		scene.add( camera );

	} else {
		// Orthographic Camera may be implemented in the future.
		camera = new THREE.PerspectiveCamera( fov, aspectratio, nearplane, farplane );
		scene.add( camera );
	}
};

export { camera };