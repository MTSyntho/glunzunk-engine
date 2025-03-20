import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, camera, renderer } from './../../editor/init.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';


let composer; // Declare composer but initialize later

// async function initComposer() {
//     const { renderer } = await import('./../../editor/init.js'); // Lazy import to break circular dependency



//     // const outputPass = new OutputPass();
//     // composer.addPass(outputPass);
// }

// await initComposer(); // Initialize composer after renderer is available

gzjs.postProcessing = async function(name, properties = {}) {
    if (!composer) {
        console.error('Composer is not initialized yet!');
        return;
    }

    composer.passes = composer.passes.filter(pass => !(pass instanceof OutputPass));

    if (name === 'glitch') {
    	
		const glitchPass = new GlitchPass();
		glitchPass.goWild = true; // Force extreme glitching
		composer.addPass(glitchPass);

    }


    const composer = new EffectComposer( renderer) ;
    composer.addPass( new RenderPass(scene, camera) );

		const glitchPass = new GlitchPass();
		glitchPass.goWild = true; // Force extreme glitching
		composer.addPass(glitchPass);
		
    const outputPass = new OutputPass();
    composer.addPass(outputPass);	
};

export { composer };
