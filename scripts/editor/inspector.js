const inspectorwin = document.querySelector('[codename="gz-inspector"]');
const inspector = document.querySelector('[codename="gz-inspector"] .wb-body');

import { objectSelected } from './gizmo.js'
import { sceneObjects } from './init.js';
import { MaterialPanel } from './windows.js'

if (inspector) {
	element.create('div', '', 'inspector-div').then(elm => elm
		.window('gz-inspector')
		.padding('12px')
		.flex()
		.vertical()
	)

	element.create('p', 'No Object is currently being selected.<br>Please select an object.', 'inspector-noobj').then(elm => elm
		.parent('inspector-div')
	)
}

document.addEventListener('objectSelected', (event) => {
	element.get('inspector-div')?.remove()

	element.create('div', '', 'inspector-div').then(elm => elm
		.window('gz-inspector')
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

	var objectscalex = event.obj.scale.x
	var objectscaley = event.obj.scale.y
	var objectscalez = event.obj.scale.z
	
	var linecss = (`
		background-color: #ffffff20;
		width: 100%;
		height: 2px;
		margin-top: 7px;
		margin-bottom: 7px;
	`)

	function createInput(name, id, content, readonly = false) {
		element.create('div', '', `inspector-${id}`).then(elm => elm
			.parent('inspector-div')
			.flex()
			.horizontal()
			.gap('5px')
		)

		element.create('p', `${name}: `, '').then(elm => elm
			.parent(`inspector-${id}`)
		)

		element.create('input', '', '').then(elm => {elm
			.parent(`inspector-${id}`)
		    .value(content)
		    .outline('none')
		    .border('none')
		    .backgroundcolor('#ffffff20')
		    .color('white')
		    .id(`inspector-input-${id}`)
		    // .attribute('readonly', readonly)
		  
			 // Add event listener after input is created and added to DOM
		    switch (id) {
		    	case 'posx':
					elm.element.addEventListener('input', (event) => {
						selectedObject.position.x = event.target.value
				 	});	    	
				 	break;
				case 'posy':
					elm.element.addEventListener('input', (event) => {
						selectedObject.position.y = event.target.value
				 	});	   
				 	break;
				case 'posz':
					elm.element.addEventListener('input', (event) => {
						selectedObject.position.z = event.target.value
				 	});	   
					break;
				case 'rotx':
				 	elm.element.addEventListener('input', (event) => {
						selectedObject.rotation.x = event.target.value
				 	});	 
				 	break;
				case 'roty':
					elm.element.addEventListener('input', (event) => {
						selectedObject.rotation.y = event.target.value
				 	});	     
				 	break;
				case 'rotz':
					elm.element.addEventListener('input', (event) => {
						selectedObject.rotation.z = event.target.value
				 	});	   
				 	break;
				case 'scalex':
				 	elm.element.addEventListener('input', (event) => {
						selectedObject.scale.x = event.target.value
				 	});	 
				 	break;
				case 'scaley':
					elm.element.addEventListener('input', (event) => {
						selectedObject.scale.y = event.target.value
				 	});	     
				 	break;
				case 'scalez':
					elm.element.addEventListener('input', (event) => {
						selectedObject.scale.z = event.target.value
				 	});	   
				 	break;

				default:
					// console.error('[GZ Inspector] Unrecognized Input ID: ' + id)
					break;
		    }
		});


	}
	element.create('p', 'Metadata', 'inspector-selectedobj-metadata').then(elm => elm
		.parent('inspector-div')
		.margin(0)
		.margintop('4px')
	)

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

	createInput('Object Name', 'name', objectname)
	createInput('UUID', 'uuid', objectuuid, true)

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

	createInput('Position X', 'posx', objectposx)
	createInput('Position Y', 'posy', objectposy)
	createInput('Position Z', 'posz', objectposz)

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

	createInput('Rotation X', 'rotx', objectrotx)
	createInput('Rotation Y', 'roty', objectroty)
	createInput('Rotation Z', 'rotz', objectrotz)

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

	createInput('Scale X', 'scalex', objectscalex)
	createInput('Scale Y', 'scaley', objectscaley)
	createInput('Scale Z', 'scalez', objectscalez)

	// element.create('p', 'Material', 'inspector-selectedobj-material').then(elm => elm
	// 	.parent('inspector-div')
	// 	.margin(0)
	// 	.margintop('4px')
	// )

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

	element.create('select', '', 'inspector-object-shape-dropdown').then(elm => {elm
		.parent('inspector-div')

		elm.element.addEventListener('change', function() {
			switch (elm.element.value) {
				case 'Box':
					selectedObject.material = gzjs.createMaterial('basic', { color: 0xb3495e })
					break;
				case 'Capsule':
					selectedObject.material = gzjs.createMaterial('lambert', { color: 0xb3495e })
					break;			
				case 'Sphere':
					selectedObject.material = gzjs.createMaterial('phong', { color: 0xb3495e })
					break;	
				case 'Cylinder':
					selectedObject.material = gzjs.createMaterial('physical', { color: 0xb3495e })
					break;			
				case 'Plane':
					selectedObject.material = gzjs.createMaterial('standard', { color: 0xb3495e })
					break;		
			}
		})
	})
	// element.create('button', 'Material' , 'material-btn').then(elm => {elm
	// 	.parent('inspector-div')
	// 	.id('inspector-material-btn')
	// 	// .attribute('onclick', MaterialPanel)

	// 	elm.element.addEventListener('click', MaterialPanel)
	// });

	// element.get('material-btn')?.onclick = MaterialPanel
	// document.getElementById('inspector-material-btn').addEventListener('onclick')

	// document.getElementById('inspector-material-btn').addEventListener('click', MaterialPanel)
});

	

document.addEventListener('objectUnselected', () => {
	element.get('inspector-div')?.remove()

	element.create('div', '', 'inspector-div').then(elm => elm
		.window('gz-inspector')
		.padding('12px')
		.flex()
		.vertical()
	)

	element.create('p', 'No Object is currently being selected.<br>Please select an object.', 'noobj').then(elm => elm
		.parent('inspector-div')
	)	
});