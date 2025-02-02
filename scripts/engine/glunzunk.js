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

loadJS('gzjs.objects')
loadJS('gzjs.lighting')
loadJS('gzjs.tonemapping')
loadJS('gzjs.fog')
loadJS('gzjs.sky')
loadJS('gzjs.shadow')

// loadJS('gzjs.camera')

// Define gzjs
var gzjs = {}
export { gzjs }

// Splash Screen 

// Game Execution

// Error Handling

// Fatal Error Handling

