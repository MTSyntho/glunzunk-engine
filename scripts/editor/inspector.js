const inspectorwin = document.querySelector('[codename="gz-inspector"]');
const inspector = document.querySelector('[codename="gz-inspector"] .wb-body');

import { objectSelected } from './gizmo.js'
import { sceneObjects } from './init.js';


if (inspector) {
	element.create('div', '', 'inspector-div').then(elm => elm
		.window('gz-inspector')
		.padding('12px')
		.flex()
		.vertical()
	)

	element.create('p', 'No Object is currently being selected.<br>Please select an object.', 'noobj').then(elm => elm
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

	var objectuuid = event.uuid
	var objectname = sceneObjects[objectuuid]

	var linecss = (`
		background-color: #ffffff20;
		width: 100%;
		height: 2px;
		margin-top: 7px;
		margin-bottom: 7px;
	`)

	element.create('p', 'Metadata', 'inspector-selectedobj-metadata').then(elm => elm
		.parent('inspector-div')
		.margin(0)
		.margintop('4px')
	)

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

	element.create('div', '', 'inspector-selectedobj-name').then(elm => elm
		.parent('inspector-div')
		.flex()
		.horizontal()
		.gap('5px')
	)

	element.create('p', 'Object Name: ', '').then(elm => elm
		.parent('inspector-selectedobj-name')
	)

	element.create('input', '', '').then(elm => elm
		.parent('inspector-selectedobj-name')
		.value(objectname)
		.outline('none')
		.border('none')
		.backgroundcolor('#ffffff20')
		.color('white')
	)

	element.create('div', '', 'inspector-selectedobj-uuid').then(elm => elm
		.parent('inspector-div')
		.flex()
		.horizontal()
		.gap('5px')
	)

	element.create('p', 'UUID: ', '').then(elm => elm
		.parent('inspector-selectedobj-uuid')
	)

	element.create('input', '', '').then(elm => elm
		.parent('inspector-selectedobj-uuid')
		.value(objectuuid)
		.outline('none')
		.border('none')
		.backgroundcolor('#ffffff20')
		.color('white')
		.readonly()
	)

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

	element.create('p', 'Material', 'inspector-selectedobj-material').then(elm => elm
		.parent('inspector-div')
		.margin(0)
		.margintop('4px')
	)

	element.create('div', '', '').then(elm => elm
		.parent('inspector-div')
		.css(linecss)
	)

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