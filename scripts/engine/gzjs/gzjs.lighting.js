import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, sceneLights } from './../../editor/init.js';

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

gzjs.createLight = function(type, name, color, position = [0, 0, 0], options) {
	if (type === 'point') {
		var pointLight = new THREE.PointLight( Number(color), options.intensity || 1, options.distance || 0, options.decay || 2 );
		Object.entries(options).forEach(([key, obj]) => {
			pointLight[key] = obj
		});
		pointLight.name = name
		// console.log(position)
		pointLight.position.set(position[0], position[1], position[2])
		scene.add( pointLight );

		sceneLights.push( pointLight )

	} else if (type === 'rectarea') {
		var rectAreaLight = new THREE.RectAreaLight( Number(color), options.intensity || 1, options.width || 10, options.height || 10 );

		Object.entries(options).forEach(([key, obj]) => {
			rectAreaLight[key] = obj
		});
		rectAreaLight.name = name
		// console.log(position)
		rectAreaLight.position.set(position[0], position[1], position[2])
		scene.add( rectAreaLight );

		sceneLights.push( rectAreaLight )

	}
}

export { newObject };

