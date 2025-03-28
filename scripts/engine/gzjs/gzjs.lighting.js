import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene } from './../../editor/init.js';

var newObject = null;

gzjs.lighting = function(type, intensity, color1, color2) {
	if (type === 'hemisphere') {
		const hemispherelight = new THREE.HemisphereLight( Number(color1) , Number(color2), intensity );
		hemispherelight.name = 'hemisphereLight'
		scene.add ( hemispherelight )
	} else if (type === 'ambient') {
		const ambientlight = new THREE.AmbientLight( Number(color1), intensity );
		ambientlight.name = 'ambientLight'
		scene.add ( ambientlight )
	}
};

export { newObject };

