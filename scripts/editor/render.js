/*
    Renderer for GZ
    Written by: MTSyntho
    Sep 2024
*/

import * as THREE from 'three';
import { handleCamera } from './../editor/camera.js';
import { inEngine, renderer, scene, activeCamera } from './../editor/init.js';
import { gzjs } from './../engine/glunzunk.js';
import { composer } from './../engine/gzjs/gzjs.postprocessing.js';
import { updateCanvasStats } from './canvasstats.js'

let frames = 0;
let fps = 0;
let previousTime = performance.now()

const maxRatio = 1; // Cap to avoid performance issues
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;



const screenPixels = screenWidth * screenHeight;

    // Ratio of canvas to screen size (scaled to match pixel density)



const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); // Get time since last frame

    gzjs.whenFrameRendered() // to trigger game loop

    if (inEngine === true) {
        handleCamera();   
    }

    const canvasWidth = renderer.domElement.clientWidth;
    const canvasHeight = renderer.domElement.clientHeight;

    const canvasPixels = canvasWidth * canvasHeight;

    const canvasScreenRatio = Math.sqrt(canvasPixels / screenPixels);
    const baseRatio = window.devicePixelRatio * 1.5;

    renderer.setPixelRatio(Math.min(baseRatio * canvasScreenRatio, maxRatio))

    frames ++;
    const time = performance.now();

    if (time >= previousTime + 1000) {
        fps = Math.round( ( frames * 1000 ) / ( time - previousTime ) )
        frames = 0;
        previousTime = time;
    }
    updateCanvasStats()
    
    composer.render(scene, activeCamera);

    // renderer.render(scene, activeCamera);
}
animate();

export { fps } 
 // animate();}
