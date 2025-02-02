import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
// import { objects } from './../../default-project.js';
import { scene } from './../../editor/init.js';

var newObject = null;

gzjs.newObject = function(type, color, size, position) {
		if (type === 'box') {
			newObject = new THREE.Mesh(
				new THREE.BoxGeometry( size[0], size[1], size[2] ), 
				new THREE.MeshStandardMaterial({ color: Number(color) })
			);	

			newObject.position.x = position[0]
			newObject.position.y = position[1]
			newObject.position.z = position[2]

		} else if (type === 'capsule' || type === 'bean') {
			newObject = new THREE.Mesh(
				new THREE.CapsuleGeometry( size[0], size[1], size[2], size[3] ),
				new THREE.MeshStandardMaterial({ color: Number(color) })
			);	

			newObject.position.x = position[0]
			newObject.position.y = position[1]
			newObject.position.z = position[2]
		};

		newObject.castShadow = true;
		newObject.receiveShadow = true;

		// objects.push( newObject )

		scene.add( newObject )
};

export { newObject };