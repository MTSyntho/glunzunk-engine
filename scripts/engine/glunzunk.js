/*
    Glunzunk Engine Game Handler
    Written by: MTSyntho
    Jan 2025
*/

// Code snippet taken from AzuOS Project (By AzuSystem) - /libs/loadModule.js
function loadJS(file) {
    var script = document.createElement("script");
    script.src = './scripts/engine/gzjs/' + file + '.js';
	script.type = 'module';

    document.head.appendChild(script);

    console.log(`[GZJS Module Import] Imported '${file}.js'`)
}

const engineFiles = [
    'gzjs.objects',
    'gzjs.object',
    'gzjs.texture',
    'gzjs.lighting',
    'gzjs.tonemapping',
    'gzjs.fog',
    'gzjs.sky',
    'gzjs.shadow',
    'gzjs.postprocessing',
    'gzjs.unloadscene',
    'gzjs.whenFrameRendered'
    // load scene is excluded as it works with project folders, not already compiled games
]

loadJS('gzjs.objects')
loadJS('gzjs.object')
loadJS('gzjs.texture')
loadJS('gzjs.lighting')
loadJS('gzjs.tonemapping')
loadJS('gzjs.fog')
loadJS('gzjs.sky')
loadJS('gzjs.shadow')
loadJS('gzjs.postprocessing')
loadJS('gzjs.whenFrameRendered')


// Keep below all other modules
loadJS('gzjs.unloadscene')
loadJS('gzjs.loadscene')


// loadJS('gzjs.camera')

// Define gzjs
var gzjs = {}
export { gzjs }

export { engineFiles }

// Splash Screen 

// Game Execution

// Error Handling

// Fatal Error Handling

