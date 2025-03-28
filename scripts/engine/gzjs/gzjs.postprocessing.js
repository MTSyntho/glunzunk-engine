
import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { renderer, scene, camera } from './../../editor/init.js';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { AfterimagePass } from 'three/addons/postprocessing/AfterimagePass.js';
import { HalftonePass } from 'three/addons/postprocessing/HalftonePass.js';
import { SAOPass } from 'three/addons/postprocessing/SAOPass.js';
import { SSAOPass } from 'three/addons/postprocessing/SSAOPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { SSRPass } from 'three/addons/postprocessing/SSRPass.js';
import { N8AOPass } from 'three/external-shaders/N8AO.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
// import { GodRaysFakeSunShader, GodRaysDepthMaskShader, GodRaysCombineShader, GodRaysGenerateShader } from 'three/addons/shaders/GodRaysShader.js';

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

    console.log(properties)

    // const composer = new EffectComposer( renderer ) ;
    // composer.addPass( new RenderPass(scene, camera) );

    composer.passes = composer.passes.filter(pass => !(pass instanceof OutputPass));

    if (action === 'add') {
        switch (name) {
            case 'glitch':
                var glitchPass = new GlitchPass();
                // glitchPass.goWild = true
                break;
            case 'gtao':
                var pass = new GTAOPass( scene, camera );
            case 'ssao':
                var pass = new SSAOPass( scene, camera );
                break;
            case 'n8ao':
                var pass = new N8AOPass( scene, camera );
                break;
            case 'ssr':
                var pass = new SSRPass({
                    renderer,
                    scene,
                    camera,
                    width: window.innerWidth,
                    height: window.innerHeight
                });
                break;
            case 'afterimage':
                var pass = new AfterimagePass( 0.5 );
                break;
            case 'halftone':
                var pass = new HalftonePass();
                break;
            case 'sao':
                var pass = new SAOPass( scene, camera );
                break;
            case 'smaa':
                var pass = new SMAAPass( scene, camera );
                break;
            // case 'godrays':
            //     var pass = new ShaderPass(GodRaysShader);
            //     pass.uniforms["lightPosition"].value = new THREE.Vector3(10, 50, -10);
            //     pass.uniforms["exposure"].value = 0.6;
            //     pass.uniforms["decay"].value = 0.95;
            //     pass.uniforms["density"].value = 0.96;
            //     pass.uniforms["weight"].value = 0.4;
            default:
                console.error("[gzjs.postprocessing] Can't recognize effect: " + name);
                break;
        }       

        if (pass && properties) {
            Object.keys(properties).forEach(key => {
                if (key in pass) {
                    pass[key] = properties[key]; // Apply the property if it exists in the pass
                } else if (pass.uniforms && key in pass.uniforms) {
                    pass.uniforms[key].value = properties[key]; // Apply if it's a shader uniform
                }
            });
        }

        composer.addPass(pass);

    } else if (action === 'clear') {
        composer.passes = composer.passes.filter(pass => pass instanceof RenderPass);
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
