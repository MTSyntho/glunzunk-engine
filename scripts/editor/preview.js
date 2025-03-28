import * as THREE from 'three';
import { camera, renderer, scene } from './init.js';
import { composer } from './../engine/gzjs/gzjs.postprocessing.js';

var previewBool = false;
var activeCamera = camera;

// function toggleGameplay() {
// 	if (previewBool === true) {
// 		activeCamera = camera;
// 		previewBool = false;
// 	} else {
// 		activeCamera = gamecamera
// 		previewBool = true;
// 	};

// 	// function animate() {
// 	//     renderer.render(scene, activeCamera);
// 	//     requestAnimationFrame(animate);
// 	// }
// 	// animate();

// };

function beginPreview() {
	const previewWindow = window.open("", "Preview", "width=800,height=600");
	// var game = previewWindow.document.createElement("re")
	// var game = document.getElementById('renderCanvas')

    const game = previewWindow.document.createElement("canvas");
    game.style.width = "100%";
    game.style.height = "100%";

	// gzjs.loadscene(window.gzjs_loadscene)

	previewWindow.document.body.appendChild(game)

    const previewRenderer = new THREE.WebGLRenderer({ canvas: game });
    previewRenderer.setSize(800, 600);
    previewRenderer.outputColorSpace = THREE.SRGBColorSpace;

    function animatePreview() {
        requestAnimationFrame(animatePreview);

        previewRenderer.render(scene, camera); // Renders same scene

        // composer.render(scene, camera)
    }

    animatePreview();

}

export { beginPreview };

window.beginPreview = beginPreview;