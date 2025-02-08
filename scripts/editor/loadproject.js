/*
    Load GZ Engine Project
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
import { camera , renderer, scene } from './init.js';
import { Sky } from 'three/addons/objects/Sky.js';
import { gzjs } from './../engine/glunzunk.js';


// Fetch the JSON file
document.addEventListener('DOMContentLoaded', function () {
	// Load Scene list, and add to dropdown
	fetch('./projects/sample/scenes/scenes.json')
		.then(response => response.json())
		.then(data => {
			Object.entries(data.scenes).forEach(([key, name]) => {
				const dropdown = document.getElementById('scene-select');
				const btn = document.createElement('button')

				btn.textContent = name

				btn.onclick = () => gzjs.loadscene(name)

				dropdown.appendChild(btn)
			});

			gzjs.loadscene(data.scenes[1])
		})
		.catch(error => {
			console.error('Error loading JSON:', error);
		});	

});