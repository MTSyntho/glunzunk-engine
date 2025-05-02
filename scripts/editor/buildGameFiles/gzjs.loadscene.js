import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
// import { scene, inEngine } from './../../init.js';
import { scene, inEngine } from './../../editor/init.js';
// import { startScene } from `./../../game/${scenename}/scene.js`
// import { startScene } from './../../game/scene1/scene.js'

var projectname = null;

scene.userData = {
	currentScene: '',
	isSceneReady: false
}

gzjs.loadscene = async function(scenename) {
	// Load Project metadata

	// console.log(scenename)

	window.gzjs_sceneName = scenename;

	gzjs.unloadscene(); // Clear any memory

	scene.userData.isSceneReady = false

	var loading = document.getElementById('loading-screen')
	loading.style.display = 'block';
	loading.style.pointerEvents = 'all';

	var sceneScript = await import(`./../../game/${scenename}/scene.js`)

	sceneScript.startScene();

	// scene.userData = {
	// 	currentScene: scenename,
	// 	isSceneReady: true
	// }
	scene.userData.currentScene = scenename
	scene.userData.isSceneReady = true

};

gzjs.isSceneLoaded = function(scenename) {
	if (scene.userData.currentScene === scenename) {
		return true;
	} else {
		return false;
	}
}