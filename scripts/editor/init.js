/*
    Editor Initilization
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
import { gzjs } from './../engine/glunzunk.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
// import animate from '/scripts/editor/render.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const gamecamera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const inEngine = true;

// let composer;

const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas, antialias:true });
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setPixelRatio(0.5)

// const camera = gzjs.newCamera( 60, scene,    window.innerWidth / window.innerHeight, 0.1, 1000 );
// export { scene, renderer, camera };  

// Function to handle window resizing
function onWindowResize() {
    // Update the camera's aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();  // Update the camera's projection matrix
    
    // Update the renderer's size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Listen for the window resize event
window.addEventListener('resize', onWindowResize, false);

camera.position.y = 1;
camera.position.z = 5;

// gamecamera.position.y = 3;
// gamecamera.position.z = 3;

let activeCamera = camera; // Default to editor camera

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
const gizmoObjects = []; // Store selectable objects
const sceneObjects = {}

// import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
// import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

    // const composer = new EffectComposer( renderer ) ;
    // composer.addPass( new RenderPass( scene, camera ));

    //     const glitchPass = new GlitchPass();
    //     glitchPass.goWild = true; // Force extreme glitching
    //     composer.addPass(glitchPass);
        
    // const outputPass = new OutputPass();
    // composer.addPass(outputPass);   

                // composer = new EffectComposer( renderer );
                // composer.addPass( new RenderPass( scene, camera ) );

                // const glitchPass = new GlitchPass();
                // composer.addPass( glitchPass );

                // const outputPass = new OutputPass();
                // composer.addPass( outputPass );

    // import { composer } from './../engine/gzjs/gzjs.postprocessing.js';


    // const { composer } = await import('./../engine/gzjs/gzjs.postprocessing.js');
    // console.log(composer)

// gzjs.postProcessing('add', 'glitch')

// function animate() {
//     requestAnimationFrame(animate);

//     const delta = clock.getDelta(); // Get time since last frame

//     handleCamera();


//     // composer.render();

//     // renderer.render(scene, activeCamera);
// }
// animate();

export { renderer, scene, camera, activeCamera, gizmoObjects, sceneObjects, inEngine };
