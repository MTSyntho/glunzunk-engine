import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, camera } from './../../editor/init.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { N8AOPass } from 'three/external-shaders/N8AO.js';

    
let composer; // Declare composer

async function initComposer() {

    const { renderer } = await import('./../../editor/init.js');

    // Ensure renderer is available (if needed)
    if (!renderer) {
        console.error("Renderer is not available.");
        return;
    }

    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    console.log("Composer initialized:", composer);
}

await initComposer(); // Initialize before usage

gzjs.postProcessing = async function(action, name, properties = {}) {
    if (!composer) {
        console.error('Composer is not initialized yet!');
        return;
    }

    // const composer = new EffectComposer( renderer ) ;
    // composer.addPass( new RenderPass(scene, camera) );

    composer.passes = composer.passes.filter(pass => !(pass instanceof OutputPass));

    if (action === 'add') {
        switch (name) {
            case 'glitch':
                var glitchPass = new GlitchPass();
                // glitchPass.goWild = true
                composer.addPass(glitchPass)
                break;
            case 'gtao':
                var gtaoPass = new GTAOPass( scene, camera );
                composer.addPass(gtaoPass)
            case 'ssao':
                var ssaoPass = new SSAOPass( scene, camera );
                composer.addPass(ssaoPass);
                break;
            case 'n8ao':
                var n8aoPass = new N8AOPass( scene, camera );
                composer.addPass(n8aoPass);
                break;
            default:
                console.error("[gzjs.postprocessing] Can't recognize effect: " + name);
                break;
        }       
    }
        
    const outputPass = new OutputPass();
    composer.addPass(outputPass);   

    console.log(composer)
};
// gzjs.postProcessing.addEffect = function(name) {

// }

// gzjs.postProcessing.addEffects(['ssao', 'bloom'])
// gzjs.postProcessing.setEffect



export { composer };
