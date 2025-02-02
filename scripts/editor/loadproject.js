/*
    Load GZ Engine Project
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
import { camera , renderer, scene } from './init.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { gzjs } from './../engine/glunzunk.js';


var projectname = null;
// Fetch the JSON file
document.addEventListener('DOMContentLoaded', function () {
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

	fetch('./projects/sample/scenes/scenes.json')
		.then(response => response.json())
		.then(data => {
			console.log(data); // The content of the JSON file
			console.log(data.name); // Access specific properties, like name
		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});	

	fetch('./projects/sample/scenes/scene1/data.json')
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
			// Boxes
			const objects = data.objects;
			if (objects.box) {
				const obj = objects.box
				gzjs.newObject(
					'box',
					obj.color,
					[obj.width, obj.height, obj.depth],
					[obj.x, obj.y, obj.z]
				);
			};
			if (objects.capsule) {
				const obj = objects.capsule
				gzjs.newObject(
					'capsule',
					obj.color,
					[obj.radius, obj.length, obj.capSegments, obj.radialSegments],
					[obj.x, obj.y, obj.z]
				);
			}


			console.log(data); // The content of the JSON file
			console.log(data.name); // Access specific properties, like name

		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});	
});