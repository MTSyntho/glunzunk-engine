import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
import { scene } from './../../editor/init.js';

var projectname = null;

gzjs.loadscene = function(scenename, clearscene = false) {
	// Load Project metadata
	fetch('./projects/sample/project.json')
		.then(response => response.json())
		.then(data => {
			const projecttitle = document.getElementById('projectname');
			projectname = data.name;
			projecttitle.textContent = projectname;
			console.log(data); // The content of the JSON file
			console.log(data.name); // Access specific properties, like name

		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});

	gzjs.unloadscene(); // Clear any memory
	// Actually load project contents
	fetch(`./projects/sample/scenes/${scenename}/data.json`)
		.then(response => response.json())
		.then(data => {
			const projecttitle = document.getElementById('projectname');
			projecttitle.textContent = `${projectname} (${data.name})`;

			// Lighting
			const lighting = data.environment.lighting
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
				gzjs.fog('expo', fog.color, fog.density)
			} else if (fog.ambient){
				gzjs.fog('ambient', fog.color, fog.intensity)
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
			Object.entries(data.objects).forEach(([key, obj]) => {
				// Boxes
			    if (obj.type === 'box') {
			        gzjs.newObject(
			            'box',
			            obj.color,
			            [obj.width, obj.height, obj.depth],
			            [obj.x, obj.y, obj.z]
			        );
			    }   

			    // Capsules (bean.)
			    if (obj.type === 'capsule') {
			        gzjs.newObject(
			            'capsule',
			            obj.color,
			            [obj.radius, obj.length, obj.capSegments, obj.radialSegments],
			            [obj.x, obj.y, obj.z]
			        );
			    }   

			    // Circles
			    if (obj.type === 'circle') {
			        gzjs.newObject(
			            'circle',
			            obj.color,
			            [obj.radius, obj.segments, obj.thetaStart, obj.thetaLength],
			            [obj.x, obj.y, obj.z]
			        );
			    }   

			    // Cone
			    if (obj.type === 'cone') {
			        gzjs.newObject(
			            'cone',
			            obj.color,
			            [obj.radius, obj.height, obj.radialSegments, obj.heightSegments, obj.openEnded, obj.thetaStart, obj.thetaLength],
			            [obj.x, obj.y, obj.z]
			        );
			    }   

			    // Cylinder
			    if (obj.type === 'cylinder') {
			        gzjs.newObject(
			            'cylinder',
			            obj.color,
			            [obj.radiusTop, obj.radiusBottom, obj.height, obj.radialSegments, obj.heightSegments, obj.openEnded, obj.thetaStart, obj.thetaLength],
			            [obj.x, obj.y, obj.z]
			        );
			    }   
			});




			console.log(data); // The content of the JSON file
			console.log(data.name); // Access specific properties, like name

		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});	
};