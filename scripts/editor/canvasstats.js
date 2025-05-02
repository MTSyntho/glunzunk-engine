import * as THREE from 'three';
import { renderer } from './init.js';
import { fps } from './render.js'

const stats = document.getElementById('canvasStats')
const gl = renderer.getContext()
const glversion = gl.getParameter(gl.VERSION)
const glslversion = gl.getParameter(gl.SHADING_LANGUAGE_VERSION)
const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

let gpu = 'Unavaliable Info on GPU';

if (debugInfo) {
	gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

}

console.log(renderer)

function updateCanvasStats() {
	stats.innerHTML = `
		three.js ${THREE.REVISION} / ${glversion}<br>
		${glslversion}<br>
		${navigator.userAgent}<br>
		${gpu}<br>
		${navigator.platform}<br>
		-=-=-=-<br>
		Renderer Resolution: ${renderer.domElement.width}x${renderer.domElement.height}<br>
		FPS: ${fps}<br>
		Pixel Ratio: ${renderer.getPixelRatio()}<br>
		Calls: ${renderer.info.render.calls}<br>
		Triangles: ${renderer.info.render.triangles}<br>
		Geometries: ${renderer.info.memory.geometries}<br>
		Textures: ${renderer.info.memory.textures}
	`	
}

// updateCanvasStats()

export { updateCanvasStats }