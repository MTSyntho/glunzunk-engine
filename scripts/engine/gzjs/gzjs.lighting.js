import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene } from './../../editor/init.js';

var newObject = null;

gzjs.lighting = function(type, intensity, color1, color2) {
	if (type === 'hemisphere') {
		const hemispherelight = new THREE.HemisphereLight( Number(color1) , Number(color2), intensity );
		scene.add ( hemispherelight )
	} else if (type === 'ambient') {
		const hemispherelight = new THREE.AmbientLight( Number(color1), intensity );
		scene.add ( hemispherelight )
	}
};

export { newObject };

