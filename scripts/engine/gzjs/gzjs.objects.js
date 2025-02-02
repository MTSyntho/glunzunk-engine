import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { objects } from './../../default-project.js';
import { scene } from './../../editor/init.js';

var newObject = null;

gzjs.newObject = function(type, color, size, scale, otherProperties) {
	if (Array.isArray(size) && size.length === 3) {
		const [x, y, z] = size;  // Destructure the size array
		// console.log(`Width: ${width}, Height: ${height}, Depth: ${depth}`);
		newObject = new THREE.Mesh(
			new THREE.BoxGeometry( x, y, z ), 
			new THREE.MeshStandardMaterial({ color: color })
		);

		newObject.castShadow = true;
		newObject.receiveShadow = true;

		objects.push( newObject )

		scene.add( newObject )

	} else {
		console.log("Invalid size format");
	}
};

export { newObject };