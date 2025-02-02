import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene } from './../../editor/init.js';

var newObject = null;

gzjs.fog = function(type, color, para1, para2) {
	if (type === 'expo' || type === 'exponential') {
		scene.fog = new THREE.FogExp2( Number(color), para1 /* Density */);
	} else if (type == 'linear') {
		scene.fog = new THREE.Fog( Number(color), para1 /* Near Fog */, para2 /* Far Fog */ )
	}
};

export { newObject };

