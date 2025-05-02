import { textureLoader } from './../engine/gzjs/gzjs.texture.js'
import { gzjs } from './../engine/glunzunk.js';

function resourcesPanel(state) {
	// exportPanel(false)
	if (state === true) {
		var panel = document.getElementById('resources-panel');

		panel.classList.remove('fade-out');
		panel.classList.add('fade-in');
		
		panel.style.display = 'block';
		panel.style.pointerEvents = 'all'

	} else if (state === false) {
		var panel = document.getElementById('resources-panel');

		panel.classList.remove('fade-in');
		panel.classList.add('fade-out');

		panel.style.display = 'none';
		panel.style.pointerEvents = 'none'

	} else if (state === 'toggle') {
		var panel = document.getElementById('resources-panel');
		var panelStyleDisplay = window.getComputedStyle(panel).display;
		console.log(panelStyleDisplay)
		if (panelStyleDisplay === 'block') { // if code editor is visible
			resourcesPanel(false)
		} else if (panelStyleDisplay === 'none') {
			resourcesPanel(true)
		}
	}
};

function refreshResources() {
	var resourceList = document.getElementById('resources-list')

	Object.keys(textureLoader.loadedTextures).forEach((key) => {
		console.log('Loaded texture:', key, textureLoader.loadedTextures[key]);

		var texture = textureLoader.loadedTextures[key]

		console.log('Texture:', texture);
		console.log('texture.source:', texture.source);
		console.log('texture.source.data:', texture.source?.data);
		console.log('texture.image:', texture.image);

		// Add Resources to Resource Panel
		var resourceItem = document.createElement('div')
		var resourceIcon = document.createElement('img')
		var resourceName = document.createElement('p')
		var resourceType = document.createElement('p')

		resourceItem.classList.add('resource-item')

		resourceIcon.style.height = '120px'
		// if (texture.source.data) {
		resourceIcon.src = texture.source && texture.source.data ? texture.source.data.src : (texture.image ? texture.image.src : '');		
		// }

		resourceName.innerText = key
		resourceType.innerText = 'Image'

		resourceType.classList.add('resource-item-type')

		resourceList.appendChild(resourceItem)
		resourceItem.appendChild(resourceIcon)
		resourceItem.appendChild(resourceName)
		resourceItem.appendChild(resourceType)
	});
}

var filePicker = document.getElementById('importResource')
filePicker.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  
  reader.onload = function(e) {
    const image = e.target.result; // base64 image

    gzjs.createTexture(file.name, image)
    refreshResources()
  };

  reader.readAsDataURL(file); // Read as base64
});

function importResource() {
	var filePicker = document.getElementById('importResource')
	filePicker.click()
}

window.resourcesPanel = resourcesPanel
window.importResource = importResource

export { refreshResources }