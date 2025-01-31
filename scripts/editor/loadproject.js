/*
    Load GZ Engine Project
    Written by: MTSyntho
    Jan 2025
*/

import * as THREE from 'three';
import { camera , renderer, scene } from './init.js';
import { Sky } from 'three/addons/objects/Sky.js';


// Fetch the JSON file
fetch('./../projects/default.json')
	.then(response => {
		// Ensure the response is okay (status 200)
		if (!response.ok) {
			throw new Error('Failed to load the JSON file');
		}
		return response.json();  // Parse the JSON from the response
	})
	.then(data => {
		// Importing Project

		
	})
	.catch(error => {
		console.error('Error loading the JSON file:', error);
	});
