import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, gizmoObjects, sceneObjects } from './../../editor/init.js';

gzjs.object = function(name) {
	return scene.getObjectByName(name);
};

