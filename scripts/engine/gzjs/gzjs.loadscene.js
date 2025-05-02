import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene, inEngine } from './../../editor/init.js';

var projectname = null;
let scenename;

scene.userData = {
	currentScene: '',
	isSceneReady: false
}

gzjs.loadscene = function(scenename) {
	// Load Project metadata

	window.gzjs_sceneName = scenename;
	// scenename = null;

	if (inEngine === true) {
		fetch('./projects/sample/project.json')
			.then(response => response.json())
			.then(data => {
				try {
					const projecttitle = document.getElementById('projectname');
					projectname = data.name;
					projecttitle.textContent = projectname;					
				} catch (error) {
					console.error('Failed to display project name: ' + error)
				}

				console.log(data); // The content of the JSON file
				console.log(data.name); // Access specific properties, like name

			})
			.catch(error => {
				console.error('Error loading JSON:', error);
			});
		}

	gzjs.unloadscene(); // Clear any memory

	scene.userData.isSceneReady = false
	
	// Actually load project contents
	fetch(`./projects/sample/scenes/${scenename}/data.json`)
		.then(response => response.json())
		.then(data => {
			try {
				const projecttitle = document.getElementById('projectname');
				projecttitle.textContent = `${projectname} (${data.name})`;				
			} catch (error) {
				console.error('Failed to display project name: ' + error)
			}


			// Environment Lighting
			const lighting = data.environment.lighting
			console.log(data)
			if (lighting.hemisphere) {
				gzjs.lighting(
					'hemisphere',
					lighting.hemisphere.intensity,
					lighting.hemisphere.color1,
					lighting.hemisphere.color2
				);
			} else if (lighting.ambient) {
				gzjs.lighting(
					'ambient',
					lighting.ambient.intensity,
					lighting.ambient.color
				);
			} else {
				console.error("[Scene Loader] Scene is missing lighting, only 'Hemisphere' and 'Ambient' are supported.")
			}

			// Tonemapping
			gzjs.tonemapping(data.environment.tonemapping.type, data.environment.tonemapping.exposure);

			// Fog
			const fog = data.environment.fog
			if (fog.expo) {
				console.log(fog)
				gzjs.fog('expo', fog.expo.color, fog.expo.density)
			} else if (fog.linear){
				gzjs.fog('linear', fog.linear.color, fog.linear.near, fog.linear.far)
			}

			// Sky
			const sky = data.environment.sky
			if (sky) {
				if (sky.enable === true) {
					gzjs.sky(
						sky.turbidity,
						sky.rayleigh,
						sky.mieCoefficient,
						sky.mieDirectionalG,
						sky.elevation,
						sky.azimuth,
						sky.scale,
						sky.sunlight.color,
						sky.sunlight.intensity,
						sky.sunlight.castShadow
					);
				};
			};

			// Shadow Map
			gzjs.shadow(true, data.environment.lighting.shadowType);
			
			// Objects
			let texturePaths = { textures: {} }
			Object.entries(data.objects).forEach(([key, obj]) => {
				// let texturePaths;

				Object.entries(obj.material?.textures || {}).forEach(([name, data]) => {
					// console.log(name, data)
					// console.log(gzjs.texture(data))
					// texturePaths = {
					// 	textures: {
					// 		[name]: gzjs.texture(data)
					// 	}
					// }
					texturePaths.textures[name] = gzjs.texture(data)
				});
				// console.log(texturePaths)
                gzjs.newObject(
                    key,
                    obj.type,
                    obj.color,
                    [obj.x, obj.y, obj.z],
                    obj.properties,
                    obj.material?.type || 'standard',
                    obj.material?.properties || {},
                    texturePaths
                );
			});

			// Light Objects
			if (data.lights) {
				Object.entries(data.lights).forEach(([key, obj]) => {
					gzjs.createLight(
						obj.type,
						key,
						obj.color,
						[obj.x, obj.y, obj.z],
						obj.properties || {}
					)
				});
			}

			// Post Processing
			// gzjs.postProcessing('glitch');


			console.log(data); // The content of the JSON file
			console.log(data.name); // Access specific properties, like name

			// Post-Processing
			Object.entries(data.effects).forEach(([key, obj]) => {
				gzjs.postProcessing('add', key, obj);
				console.log(key, obj)
			});

			scene.userData.currentScene = scenename
			scene.userData.isSceneReady = true

		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});	
};


export { scenename }

// gzjs.isSceneLoaded = function(scenename) {
// 	if (scene.userData.currentScene === scenename) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }