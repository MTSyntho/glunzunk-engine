/*
    Load GZ Engine Project
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
import { camera , renderer, scene, inEngine } from './init.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { gzjs } from './../engine/glunzunk.js';

var projectScenes = null;

// Fetch the JSON file
	document.addEventListener('DOMContentLoaded', function () {
		// Load Scene list, and add to dropdown
		fetch('./projects/sample/scenes/scenes.json')
			.then(response => response.json())
			.then(data => {
				projectScenes = data.scenes;
				Object.entries(data.scenes).forEach(([key, name]) => {
					try {
						const dropdown = document.getElementById('scene-select');
						const btn = document.createElement('button')

						btn.textContent = name

						btn.onclick = () => gzjs.loadscene(name)

						dropdown.appendChild(btn)					
					} catch (error) {
						console.error('Failed to add scenes to dropdown: ' +  error)
					}

				});

				gzjs.loadscene(data.scenes[1])
			})
			.catch(error => {
				console.error('Error loading JSON:', error);
			});	

	});

export { projectScenes }