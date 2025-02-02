import { gamecamera, camera, renderer, scene } from './init.js';

var previewBool = false;
var activeCamera = camera;

function toggleGameplay() {
	if (previewBool === true) {
		activeCamera = camera;

		previewBool = false;
	} else {
		activeCamera = gamecamera

		previewBool = true;
	};
};

export { toggleGameplay };