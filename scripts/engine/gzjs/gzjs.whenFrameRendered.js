import * as THREE from 'three'; 
import { gzjs } from './../glunzunk.js';
import { scene } from './../../editor/init.js';

// the name may not make sense now but it does during usage
gzjs.whenFrameRendered = function() {
	if (scene.userData.isSceneReady === true) {
		return true;
	} else {
		return false
	}
};

