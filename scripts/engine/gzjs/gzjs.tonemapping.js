import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, renderer } from './../../editor/init.js';

var newObject = null;

gzjs.tonemapping = function(type, exposure) {
	if (type == 'none' || type === '' || type === null) {
		renderer.toneMapping = THREE.NoToneMapping;
	} else if (type == 'linear') {
		renderer.toneMapping = THREE.LinearToneMapping;
	} else if (type == 'reinhard') {
		renderer.toneMapping = THREE.ReinhardToneMapping;
	} else if (type == 'cineon') {
		renderer.toneMapping = THREE.CineonToneMapping;
	} else if (type == 'acesfilmic' || type == 'aces') {
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
	} else if (type == 'AgX') {
		renderer.toneMapping = THREE.AgXToneMapping;
	} else if (type == 'neutral') {
		renderer.toneMapping = THREE.NeutralToneMapping;
	};
	renderer.toneMappingExposure = exposure;
};

export { newObject };

