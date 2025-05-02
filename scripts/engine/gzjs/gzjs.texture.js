import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
// import { scene, gizmoObjects, sceneObjects } from './../../editor/init.js';

const textureLoader = new THREE.TextureLoader()
textureLoader.loadedTextures = {} // why doesnt threejs store these on its own???

// create texture
gzjs.createTexture = function(name, path, wrapS = 'fit', wrapT = 'fit', repeat = [ 1, 1 ]) {
	// return scene.getObjectByName(name);

	// console.log('[gzjs.texture.js] Parsed Image: ' + path)
	const texture = textureLoader.load( path );

	switch (wrapS){
		case 'fit': texture.wrapS = THREE.ClampToEdgeWrapping; break;
		case 'repeat': texture.wrapS = THREE.RepeatWrapping; break;
		case 'mirrorRepeat': texture.wrapS = THREE.MirroredRepeatWrapping; break;
	};
	switch (wrapT){
		case 'fit': texture.wrapT = THREE.ClampToEdgeWrapping; break;
		case 'repeat': texture.wrapT = THREE.RepeatWrapping; break;
		case 'mirrorRepeat': texture.wrapT = THREE.MirroredRepeatWrapping; break;
	};

	// texture.repeat.set( 4, 4 );
	// texture.repeat.set( repeat )
	texture.repeat.set( repeat[0], repeat[1] )
	texture.name = name

	textureLoader.loadedTextures[name] = texture;

	// console.log('[gzjs.texture.js] Texture: ' + texture) // returns [object Object] but thats probably fine ( insane foreshadowing )
	console.log(textureLoader.loadedTextures)
};

// fetch texture
gzjs.texture = function(name) {
    const texture = textureLoader.loadedTextures[name];
    if (!texture) {
        console.warn(`[gzjs.texture.js] Texture "${name}" not found`);
    }
    return texture || null;
};

export { textureLoader }