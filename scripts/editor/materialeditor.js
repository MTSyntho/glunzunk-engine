const materialPanelwin = document.querySelector('[codename="gz-material"]');
const materialPanel = document.querySelector('[codename="gz-material"] .wb-body');

import * as THREE from 'three';
import { objectSelected } from './gizmo.js';
import { sceneObjects } from './init.js';
import { gzjs } from './../engine/glunzunk.js';

if (materialPanel) {
	element.create('div', '', 'materialPanel-div').then(elm => elm
		.window('gz-material')
		.padding('12px')
		.flex()
		.vertical()
	)
	
	element.create('p', 'No Object is currently being selected.<br>Please select an object.', 'material-noobj').then(elm => elm
		.parent('materialPanel-div')
	)
}

document.addEventListener('objectSelected', (event) => {
	element.get('materialPanel-div')?.remove()

	element.create('div', '', 'materialPanel-div').then(elm => elm
		.window('gz-material')
		.padding('12px')
		.gap('2px')
		.flex()
		.vertical()
	)

	 var selectedObject = event.obj
	var objectuuid = event.uuid
	var objectname = sceneObjects[objectuuid]

	var objectposx = event.obj.position.x
	var objectposy = event.obj.position.y
	var objectposz = event.obj.position.z

	var objectrotx = event.obj.rotation.x
	var objectroty = event.obj.rotation.y
	var objectrotz = event.obj.rotation.z
	
	var linecss = (`
		background-color: #ffffff20;
		width: 100%;
		height: 2px;
		margin-top: 7px;
		margin-bottom: 7px;
	`)

	console.log(selectedObject.name)

	function createInput(name, id, content, readonly = false) {
		element.create('div', '', `materialPanel-${id}`).then(elm => elm
			.parent('materialPanel-div')
			.flex()
			.horizontal()
			.gap('5px')
		)

		element.create('p', `${name}: `, '').then(elm => elm
			.parent(`materialPanel-${id}`)
		)

		element.create('input', '', '').then(elm => {elm
			.parent(`materialPanel-${id}`)
		    .value(content)
		    .outline('none')
		    .border('none')
		    .backgroundcolor('#ffffff20')
		    .color('white')
		    .id(`materialPanel-input-${id}`)
		    // .attribute('readonly', readonly)
		  
			 // Add event listener after input is created and added to DOM
		    switch (id) {
		    	case 'color':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.color.setHex(parseInt(event.target.value.replace('#', ''), 16));
				 	});	    	
				 	break;
				case 'emissive':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.emissive.setHex(parseInt(event.target.value.replace('#', ''), 16));
				 	});	   
				 	break;
				case 'specular':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.specular.setHex(parseInt(event.target.value.replace('#', ''), 16));
				 	});	   
					break;
				 case 'shininess':
				 	elm.element.addEventListener('input', (event) => {
						selectedObject.material.shininess = event.target.value
				 	});	 
				 	break;
				case 'rough':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.roughness = event.target.value
				 	});	     
				 	break;
				case 'metal':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.metalness = event.target.value
				 	});	   
				 	break;
				case 'ior':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.ior = event.target.value
				 	});	   
				 	break;
				case 'reflectivity':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.reflectivity = event.target.value
				 	});	   
				 	break;
				case 'iridescence':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.iridescence = event.target.value
				 	});	   
				 	break;
				case 'iridescenceior':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.iridescenceIOR = event.target.value
				 	});	   
				 	break;
				case 'sheen':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.sheen = event.target.value
				 	});	   
				 	break;
				case 'sheenrough':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.sheenRoughness = event.target.value
				 	});	   
				 	break;
				case 'sheencolor':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.sheenColor.setHex(parseInt(event.target.value.replace('#', ''), 16));
				 	});	   
				 	break;
				case 'clearcoat':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.clearcoat = event.target.value
				 	});	   
				 	break;
				case 'clearcoatrough':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.clearcoatRoughness = event.target.value
				 	});	   
				 	break;
				case 'specularintensity':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.specularIntensity = event.target.value
				 	});	   
				 	break;
				case 'specularcolor':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.specularColor.setHex(parseInt(event.target.value.replace('#', ''), 16));
				 	});	   
				 	break;
				case 'dispersion':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.dispersion = event.target.value
				 	});	   
				 	break;
				case 'opacity':
					elm.element.addEventListener('input', (event) => {
						selectedObject.material.opacity = event.target.value
				 	});	   
				 	break;

				default:
					// console.error('[GZ materialPanel] Unrecognized Input ID: ' + id)
					break;
		    }
		});


	}
	element.create('p', 'Material', 'materialPanel-selectedobj-title').then(elm => elm
		.parent('materialPanel-div')
		.margin(0)
		.margintop('4px')
	)

	element.create('div', '', '').then(elm => elm
		.parent('materialPanel-div')
		.css(linecss)
	)

	element.create('select', '', 'material-type-dropdown').then(elm => {elm
		.parent('materialPanel-div')

		elm.element.addEventListener('change', function() {
			switch (elm.element.value) {
				case 'basic':
					selectedObject.material = gzjs.createMaterial('basic', { color: 0xb3495e })
					break;
				case 'lambert':
					selectedObject.material = gzjs.createMaterial('lambert', { color: 0xb3495e })
					break;			
				case 'phong':
					selectedObject.material = gzjs.createMaterial('phong', { color: 0xb3495e })
					break;	
				case 'pbr':
					selectedObject.material = gzjs.createMaterial('physical', { color: 0xb3495e })
					break;			
				case 'standard':
					selectedObject.material = gzjs.createMaterial('standard', { color: 0xb3495e })
					break;		
			}
		})
	})

	console.log(selectedObject.material)
	switch (selectedObject.material.type) {
		case 'MeshBasicMaterial':
			element.get('materialPanel-div')?.remove()
			createInput('Color', 'color', selectedObject.material.color.getHexString())
			break;
		case 'MeshLambertMaterial':
			element.get('materialPanel-div')?.remove()
			createInput('Color', 'color', selectedObject.material.color.getHexString())
			createInput('Emissive Color', 'emissive', selectedObject.material.emissive.getHexString())
			break;
		case 'MeshPhongMaterial':
			element.get('materialPanel-div')?.remove()
			createInput('Color', 'color', selectedObject.material.color.getHexString())
			createInput('Emissive Color', 'emissive', selectedObject.material.emissive.getHexString())
			createInput('Specular Color', 'specular', selectedObject.material.specular.getHexString())
			createInput('Shininess', 'shininess', selectedObject.material.shininess)
			break;
		case 'MeshPhysicalMaterial':
			element.get('materialPanel-div')?.remove()
			createInput('Color', 'color', selectedObject.material.color.getHexString())
			createInput('Emissive Color', 'emissive', selectedObject.material.emissive.getHexString())
			createInput('Roughness', 'rough', selectedObject.material.roughness)
			createInput('Metalness', 'metal', selectedObject.material.metalness)
			createInput('IOR', 'ior', selectedObject.material.ior)
			createInput('Reflectivity', 'reflectivity', selectedObject.material.reflectivity)
			createInput('Iridescence', 'iridescence', selectedObject.material.iridescence)
			createInput('Iridescence IOR', 'iridescenceior', selectedObject.material.iridescenceIOR)
			createInput('Sheen', 'sheen', selectedObject.material.sheen)
			createInput('Sheen Roughness', 'sheenrough', selectedObject.material.sheenRoughness)
			createInput('Sheen Color', 'sheencolor', selectedObject.material.sheenColor.getHexString())
			createInput('Clearcoat', 'clearcoat', selectedObject.material.clearcoat)
			createInput('Clearcoat Roughness', 'clearcoatrough', selectedObject.material.clearcoatRoughness)
			createInput('Specular Intensity', 'specularintensity', selectedObject.material.specularIntensity)
			createInput('Specular Color', 'specularcolor', selectedObject.material.specularColor.getHexString())
			createInput('Dispersion', 'dispersion', selectedObject.material.dispersion)
			createInput('Opacity', 'opacity', selectedObject.material.opacity)
			selectedObject.material.transparent = true;
			break;
		case 'MeshStandardMaterial':
			element.get('materialPanel-div')?.remove()
			createInput('Color', 'color', selectedObject.material.color.getHexString())
			createInput('Emissive Color', 'emissive', selectedObject.material.emissive.getHexString())
			createInput('Roughness', 'rough', selectedObject.material.roughness)
			createInput('Metalness', 'metal', selectedObject.material.metalness)
			break;
		default:
			console.error('[Material Editor] Unrecognized material: ' + selectedObject.material.type)
	}

	element.create('option', 'Basic', '').then(elm => elm
		.parent('material-type-dropdown')
		.attribute('value', 'basic')
	)

	element.create('option', 'Lambert', '').then(elm => elm
		.parent('material-type-dropdown')
		.attribute('value', 'lambert')
	)

	element.create('option', 'Phong', '').then(elm => elm
		.parent('material-type-dropdown')
		.attribute('value', 'phong')
	)

	element.create('option', 'Physical (PBR)', '').then(elm => elm
		.parent('material-type-dropdown')
		.attribute('value', 'pbr')
	)

	element.create('option', 'Standard', '').then(elm => elm
		.parent('material-type-dropdown')
		.attribute('value', 'standard')
	)

	// element.create('option', 'Toon', '').then(elm => elm
	// 	.parent('material-type-dropdown')
	// )

	// element.create('option', 'Matcap', '').then(elm => elm
	// 	.parent('material-type-dropdown')
	// )

	// createInput('Object Name', 'name', objectname)
	// createInput('UUID', 'uuid', objectuuid, true)

	// element.create('div', '', '').then(elm => elm
	// 	.parent('materialPanel-div')
	// 	.css(linecss)
	// )

	// createInput('Position X', 'posx', objectposx)
	// createInput('Position Y', 'posy', objectposy)
	// createInput('Position Z', 'posz', objectposz)

	// element.create('div', '', '').then(elm => elm
	// 	.parent('materialPanel-div')
	// 	.css(linecss)
	// )

	// createInput('Rotation X', 'rotx', objectrotx)
	// createInput('Rotation Y', 'roty', objectroty)
	// createInput('Rotation Z', 'rotz', objectrotz)

	// element.create('p', 'Material', 'materialPanel-selectedobj-material').then(elm => elm
	// 	.parent('materialPanel-div')
	// 	.margin(0)
	// 	.margintop('4px')
	// )

	element.create('div', '', '').then(elm => elm
		.parent('materialPanel-div')
		.css(linecss)
	)

	element.create('button', 'Apply Material' , 'material-btn').then(elm => {elm
		.parent('materialPanel-div')
		.id('materialPanel-material-btn')
		// .attribute('onclick', MaterialPanel)

		// elm.element.addEventListener('click', MaterialPanel)
	});

	// element.get('material-btn')?.onclick = MaterialPanel
	// document.getElementById('materialPanel-material-btn').addEventListener('onclick')

	// document.getElementById('materialPanel-material-btn').addEventListener('click', MaterialPanel)
});

document.addEventListener('objectUnselected', () => {
	element.get('materialPanel-div')?.remove()

	element.create('div', '', 'materialPanel-div').then(elm => elm
		.window('gz-material')
		.padding('12px')
		.flex()
		.vertical()
	)
	
	element.create('p', 'No Object is currently being selected.<br>Please select an object.', 'material-noobj').then(elm => elm
		.parent('materialPanel-div')
	)
});