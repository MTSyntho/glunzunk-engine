import * as THREE from 'three';
import { gzjs } from './../engine/glunzunk.js';
import { renderer, scene, sceneObjects, sceneLights } from './../editor/init.js';
import { projectScenes } from './loadproject.js'

function saveProject() {
	// console.log(projectScenes)

		var sceneJSON = {
			name: window.gzjs_sceneName,
			environment: {
				lighting: {},
				tonemapping: {
					type: "",
					exposure: 0.5
				},
				fog: {},
				sky: {
					enable: false,
					sunlight: {
						color: "",
						intensity: 0,
						castShadow: false
					}
				}
			},
			effects: {},
			objects: {},
			lights: {}
		}

		// Lighting
		if (gzjs.object('hemisphereLight')) {
			console.log(gzjs.object('ambientLight'))
			sceneJSON.environment.lighting = {
				hemisphere: {
					color1: "0x" + gzjs.object('hemisphereLight').color.getHexString(),
					color2: "0x" + gzjs.object('hemisphereLight').groundColor.getHexString(),
					intensity: gzjs.object('hemisphereLight').intensity
				}
			};
		} else if (gzjs.object('ambientLight')) {
			sceneJSON.environment.lighting = {
				ambient: {
					color: "0x" + gzjs.object('ambientLight').color.getHexString(),
					intensity: gzjs.object('ambientLight').intensity
				}
			};		
		}

		// Tonemapping
		if (renderer.toneMapping === THREE.NoToneMapping) {
			sceneJSON.environment.tonemapping.type = 'none'
		} else if (renderer.toneMapping === THREE.LinearToneMapping) {
			sceneJSON.environment.tonemapping.type = 'linear'
		} else if (renderer.toneMapping === THREE.ReinhardToneMapping) {
			sceneJSON.environment.tonemapping.type = 'reinhard'
		} else if (renderer.toneMapping === THREE.CineonToneMapping) {
			sceneJSON.environment.tonemapping.type = 'cineon'
		} else if (renderer.toneMapping === THREE.ACESFilmicToneMapping) {
			sceneJSON.environment.tonemapping.type = 'acesfilmic'
		} else if (renderer.toneMapping === THREE.AgXToneMapping) {
			sceneJSON.environment.tonemapping.type = 'AgX'
		} else if (renderer.toneMapping === THREE.NeutralToneMapping) {
			sceneJSON.environment.tonemapping.type = 'neutral'
		};

		if (renderer.toneMapping === THREE.NoToneMapping) {
			delete sceneJSON.environment.tonemapping.exposure
		} else {
			sceneJSON.environment.tonemapping.exposure = renderer.toneMappingExposure
		}

		// Fog
		if (scene.fog instanceof THREE.Fog) {
			sceneJSON.environment.fog = {
				linear: {
					color: "0x" + scene.fog.color.getHexString(),
					near: scene.fog.near,
					far: scene.fog.far
				}
			}
		} else if (scene.fog instanceof THREE.FogExp2) {
			sceneJSON.environment.fog = {
				expo: {
					color: "0x" + scene.fog.color.getHexString(),
					density: scene.fog.density
				}
			}
		} else {
			delete sceneJSON.environment.fog
		}

		// Sky 
		sceneJSON.environment.sky = {
			enable: true,
			turbidity: gzjs.object('gzjsSky')?.material.uniforms['turbidity'].value ?? 0,
			rayleigh: gzjs.object('gzjsSky')?.material.uniforms['rayleigh'].value ?? 0,
			mieCoefficient: gzjs.object('gzjsSky')?.material.uniforms['mieCoefficient'].value ?? 0,
			mieDirectionalG: gzjs.object('gzjsSky')?.material.uniforms['mieDirectionalG'].value ?? 0,
			// elevation: gzjs.object('gzjsSky')?.material.uniforms['sunPosition'].value ?? 0,
			elevation: 0,
			azimuth: 180,
			scale: gzjs.object('gzjsSky')?.scale.y ?? 0, // either x, y, and z will work
			sunlight: {
				color: "0x" + (gzjs.object('gzjsSunlight')?.color.getHexString() ?? 'ffffff'),
				intensity: gzjs.object('gzjsSunlight')?.intensity ?? 0,
				castShadow: gzjs.object('gzjsSunlight')?.castShadow ?? false
			}
		}

		// Shadow Map
		if (renderer.shadowMap.type === THREE.BasicShadowMap) {
			sceneJSON.environment.lighting.shadowType = 'Basic';	
		} else if (renderer.shadowMap.type === THREE.PCFShadowMap) {
			sceneJSON.environment.lighting.shadowType = 'PCF'
		} else if (renderer.shadowMap.type === THREE.PCFSoftShadowMap) {
			sceneJSON.environment.lighting.shadowType = 'PCFSoft'
		} else if (renderer.shadowMap.type === THREE.VSMShadowMap) {
			sceneJSON.environment.lighting.shadowType = 'VSM'
		};

		// Post-processing
		// if ()
		// Objects
		Object.keys(sceneObjects).forEach(uuid => {
			const obj = scene.getObjectByProperty('uuid', uuid)
			if (obj) {
				console.log(obj)
				sceneJSON.objects[obj.name] = {
					type: "shape",
					color: "0x" + obj.material.color.getHexString(),
					x: obj.position.x,
					y: obj.position.y,
					z: obj.position.z,
					properties: {},
					material: {
						type: ""
					}
				}

				// Material
				if (obj.material.type === 'MeshBasicMaterial') {
					sceneJSON.objects[obj.name].material.type = 'basic'
				} else if (obj.material.type === 'MeshLambertMaterial') {
					sceneJSON.objects[obj.name].material.type = 'lambert'
				} else if (obj.material.type === 'MeshPhongMaterial') {
					sceneJSON.objects[obj.name].material.type = 'phong'
				} else if (obj.material.type === 'MeshPhysicalMaterial') {
					sceneJSON.objects[obj.name].material.type = 'physical'
				} else if (obj.material.type === 'MeshStandardMaterial') {
					sceneJSON.objects[obj.name].material.type = 'standard'
				}

				console.log(obj.material)
				// if (sceneJSON.objects[obj.name].material.properties) {
				// 	sceneJSON.objects[obj.name].material.properties = obj.material.properties
				// }

				if (sceneJSON.objects[obj.name].material) {
					var textures = {
						map: obj.material.map?.name ?? "",
						aoMap: obj.material.aoMap?.name ?? "",
						normalMap: obj.material.normalMap?.name ?? "",
						roughnessMap: obj.material.roughnessMap?.name ?? "",
						displacementMap: obj.material.displacementMap?.name ?? ""					
					}

					if (textures) {
						sceneJSON.objects[obj.name].material.textures = textures;
					}
				}

				// console.log(obj.material)
				// sceneJSON.objects[obj.name].material.properties = obj.material


				// Shape (the amount of if else here is insane)
				if (obj.geometry.type === 'BoxGeometry') {
					sceneJSON.objects[obj.name].type = 'box'
				} else if (obj.geometry.type === 'CapsuleGeometry') {
					sceneJSON.objects[obj.name].type = 'capsule'
				} else if (obj.geometry.type === 'CircleGeometry') {
					sceneJSON.objects[obj.name].type = 'circle'
				} else if (obj.geometry.type === 'ConeGeometry') {
					sceneJSON.objects[obj.name].type = 'cone'
				} else if (obj.geometry.type === 'CylinderGeometry') {
					sceneJSON.objects[obj.name].type = 'cylinder'
				} else if (obj.geometry.type === 'DodecahedronGeometry') {
					sceneJSON.objects[obj.name].type = 'dodecahedron'
				} else if (obj.geometry.type === 'IcosahedronGeometry') {
					sceneJSON.objects[obj.name].type = 'icosahedron'
				} else if (obj.geometry.type === 'LatheGeometry') {
					sceneJSON.objects[obj.name].type = 'lathe'
				} else if (obj.geometry.type === 'OctahedronGeometry') {
					sceneJSON.objects[obj.name].type = 'octahedron'
				} else if (obj.geometry.type === 'PlaneGeometry') {
					sceneJSON.objects[obj.name].type = 'plane'
				} else if (obj.geometry.type === 'RingGeometry') {
					sceneJSON.objects[obj.name].type = 'ring'
				} else if (obj.geometry.type === 'SphereGeometry') {
					sceneJSON.objects[obj.name].type = 'sphere'
				} else if (obj.geometry.type === 'TetrahedronGeometry') {
					sceneJSON.objects[obj.name].type = 'tetrahedron'
				} else if (obj.geometry.type === 'TorusGeometry') {
					sceneJSON.objects[obj.name].type = 'torus'
				} else if (obj.geometry.type === 'TorusKnotGeometry') {
					sceneJSON.objects[obj.name].type = 'torusknot'
				}

				// Properties
				sceneJSON.objects[obj.name].properties = obj.geometry.parameters

			}
		})

		// Light Objects
		console.log(sceneLights)
		Object.values(sceneLights).forEach(light => {

	        sceneJSON.lights[light.name] = {
	            type: '',
	            color: '',
	            position: {},
	            properties: {}
	        };
   
			console.log(light)
			if (light.type === 'PointLight') {
				sceneJSON.lights[light.name].type = 'point'
			} else if (light.type === 'RectAreaLight') {
				sceneJSON.lights[light.name].type = 'rectarea'
				sceneJSON.lights[light.name].properties.width = light.width
				sceneJSON.lights[light.name].properties.height = light.height
			}

			sceneJSON.lights[light.name].color = "0x" + light.color.getHexString()
			sceneJSON.lights[light.name].position = light.position
			sceneJSON.lights[light.name].properties.intensity = light.intensity
			sceneJSON.lights[light.name].properties.distance = light.distance
			sceneJSON.lights[light.name].properties.castShadow = light.castShadow ?? (light.type === 'RectAreaLight' ? false : true); // chatgpt had to write this condition thingy ;-;
		});

		console.log(sceneJSON)

		var jsonResult = JSON.stringify(sceneJSON, null, 2);
		console.log(jsonResult);


// 	Object.entries(projectScenes).forEach(([key, name]) => {
// 		gzjs.loadscene(name)

// 		var sceneJSON = {
// 			name: window.gzjs_sceneName,
// 			environment: {
// 				lighting: {},
// 				tonemapping: {
// 					type: "",
// 					exposure: 0.5
// 				},
// 				fog: {},
// 				sky: {
// 					enable: false,
// 					sunlight: {
// 						color: "",
// 						intensity: 0,
// 						castShadow: false
// 					}
// 				}
// 			},
// 			objects: {}
// 		}

// 		// Lighting
// 		if (gzjs.object('hemisphereLight')) {
// 			console.log(gzjs.object('ambientLight'))
// 			sceneJSON.environment.lighting = {
// 				hemisphere: {
// 					color1: "0x" + gzjs.object('hemisphereLight').color.getHexString(),
// 					color2: "0x" + gzjs.object('hemisphereLight').groundColor.getHexString(),
// 					intensity: gzjs.object('hemisphereLight').intensity
// 				}
// 			};
// 		} else if (gzjs.object('ambientLight')) {
// 			sceneJSON.environment.lighting = {
// 				ambient: {
// 					color: "0x" + gzjs.object('ambientLight').color.getHexString(),
// 					intensity: gzjs.object('ambientLight').intensity
// 				}
// 			};		
// 		}

// 		// Tonemapping
// 		if (renderer.toneMapping === THREE.NoToneMapping) {
// 			sceneJSON.environment.tonemapping.type = 'none'
// 		} else if (renderer.toneMapping === THREE.LinearToneMapping) {
// 			sceneJSON.environment.tonemapping.type = 'linear'
// 		} else if (renderer.toneMapping === THREE.ReinhardToneMapping) {
// 			sceneJSON.environment.tonemapping.type = 'reinhard'
// 		} else if (renderer.toneMapping === THREE.CineonToneMapping) {
// 			sceneJSON.environment.tonemapping.type = 'cineon'
// 		} else if (renderer.toneMapping === THREE.ACESFilmicToneMapping) {
// 			sceneJSON.environment.tonemapping.type = 'acesfilmic'
// 		} else if (renderer.toneMapping === THREE.AgXToneMapping) {
// 			sceneJSON.environment.tonemapping.type = 'AgX'
// 		} else if (renderer.toneMapping === THREE.NeutralToneMapping) {
// 			sceneJSON.environment.tonemapping.type = 'neutral'
// 		};

// 		if (renderer.toneMapping === THREE.NoToneMapping) {
// 			delete sceneJSON.environment.tonemapping.exposure
// 		} else {
// 			sceneJSON.environment.tonemapping.exposure = renderer.toneMappingExposure
// 		}

// 		// Fog

// 		// Sky
// 		sceneJSON.environment.sky = {
// 			enable: true,
// 			turbidity: gzjs.object('gzjsSky').material.uniforms['turbidity'].value,
// 			rayleigh: gzjs.object('gzjsSky').material.uniforms['rayleigh'].value,
// 			mieCoefficient: gzjs.object('gzjsSky').material.uniforms['mieCoefficient'].value,
// 			mieDirectionalG: gzjs.object('gzjsSky').material.uniforms['mieDirectionalG'].value,
// 			// elevation: gzjs.object('gzjsSky').material.uniforms['sunPosition'].value
// 			elevation: 0,
// 			azimuth: 180,
// 			scale: gzjs.object('gzjsSky').scale.y, // either x, y, and z will work
// 			sunlight: {
// 				color: "0x" + gzjs.object('gzjsSunlight').color.getHexString(),
// 				intensity: gzjs.object('gzjsSunlight').intensity,
// 				castShadow: gzjs.object('gzjsSunlight').castShadow
// 			}
// 		}

// 		// Shadow Map
// 		if (renderer.shadowMap.type === THREE.BasicShadowMap) {
// 			sceneJSON.environment.lighting.shadowType = 'Basic';	
// 		} else if (renderer.shadowMap.type === THREE.PCFShadowMap) {
// 			sceneJSON.environment.lighting.shadowType = 'PCF'
// 		} else if (renderer.shadowMap.type === THREE.PCFSoftShadowMap) {
// 			sceneJSON.environment.lighting.shadowType = 'PCFSoft'
// 		} else if (renderer.shadowMap.type === THREE.VSMShadowMap) {
// 			sceneJSON.environment.lighting.shadowType = 'VSM'
// 		};

// 		// Objects
// 		Object.keys(sceneObjects).forEach(uuid => {
// 			const obj = scene.getObjectByProperty('uuid', uuid)
// 			if (obj) {
// 				console.log(obj)
// 				sceneJSON.objects[obj.name] = {
// 					type: "shape",
// 					color: "0x" + obj.material.color.getHexString(),
// 					x: obj.position.x,
// 					y: obj.position.y,
// 					z: obj.position.z,
// 					properties: {},
// 					material: {
// 						type: ""
// 					}
// 				}

// 				// Material
// 				if (obj.material.type === 'MeshBasicMaterial') {
// 					sceneJSON.objects[obj.name].material.type = 'basic'
// 				} else if (obj.material.type === 'MeshLambertMaterial') {
// 					sceneJSON.objects[obj.nane].material.type = 'lambert'
// 				} else if (obj.material.type === 'MeshPhongMaterial') {
// 					sceneJSON.objects[obj.name].material.type = 'phong'
// 				} else if (obj.material.type === 'MeshPhysicalMaterial') {
// 					sceneJSON.objects[obj.name].material.type = 'physical'
// 				} else if (obj.material.type === 'MeshStandardMaterial') {
// 					sceneJSON.objects[obj.name].material.type = 'standard'
// 				}

// 				// Shape (the amount of if else here is insane)
// 				if (obj.geometry.type === 'BoxGeometry') {
// 					sceneJSON.objects[obj.name].type = 'box'
// 				} else if (obj.geometry.type === 'CapsuleGeometry') {
// 					sceneJSON.objects[obj.name].type = 'capsule'
// 				} else if (obj.geometry.type === 'CircleGeometry') {
// 					sceneJSON.objects[obj.name].type = 'circle'
// 				} else if (obj.geometry.type === 'ConeGeometry') {
// 					sceneJSON.objects[obj.name].type = 'cone'
// 				} else if (obj.geometry.type === 'CylinderGeometry') {
// 					sceneJSON.objects[obj.name].type = 'cylinder'
// 				} else if (obj.geometry.type === 'DodecahedronGeometry') {
// 					sceneJSON.objects[obj.name].type = 'dodecahedron'
// 				} else if (obj.geometry.type === 'IcosahedronGeometry') {
// 					sceneJSON.objects[obj.name].type = 'icosahedron'
// 				} else if (obj.geometry.type === 'LatheGeometry') {
// 					sceneJSON.objects[obj.name].type = 'lathe'
// 				} else if (obj.geometry.type === 'OctahedronGeometry') {
// 					sceneJSON.objects[obj.name].type = 'octahedron'
// 				} else if (obj.geometry.type === 'PlaneGeometry') {
// 					sceneJSON.objects[obj.name].type = 'plane'
// 				} else if (obj.geometry.type === 'RingGeometry') {
// 					sceneJSON.objects[obj.name].type = 'ring'
// 				} else if (obj.geometry.type === 'SphereGeometry') {
// 					sceneJSON.objects[obj.name].type = 'sphere'
// 				} else if (obj.geometry.type === 'TetrahedronGeometry') {
// 					sceneJSON.objects[obj.name].type = 'tetrahedron'
// 				} else if (obj.geometry.type === 'TorusGeometry') {
// 					sceneJSON.objects[obj.name].type = 'torus'
// 				} else if (obj.geometry.type === 'TorusKnotGeometry') {
// 					sceneJSON.objects[obj.name].type = 'torusknot'
// 				}

// 				// Properties
// 				sceneJSON.objects[obj.name].properties = obj.geometry.parameters
// 			}
// 		})

// 		console.log(sceneJSON)

// 		var jsonResult = JSON.stringify(sceneJSON, null, 2);
// 		console.log(jsonResult);

// 		if (gzjs.isSceneLoaded === true) {
// 			gzjs.unloadScene()
// 		}
// 	});

// // console.log(projectScenes)

		return sceneJSON
}

window.saveProject = saveProject;