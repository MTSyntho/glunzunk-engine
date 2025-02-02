import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { renderer } from './../../editor/init.js';

gzjs.shadow = function(enable, type) {
	if (enable === false) {
		renderer.shadowMap.enabled = false;
	} else {
		if (type === 'Basic') {
			renderer.shadowMap.type = THREE.BasicShadowMap;
		} else if (type === 'PCF') {
			renderer.shadowMap.type = THREE.PCFShadowMap;
		} else if (type === 'PCFoft' || type === 'Soft') {
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		} else if (type === 'VSM') {
			renderer.shadowMap.type = THREE.VSMShadowMap
		}
	}
};