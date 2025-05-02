import { gzjs } from './../engine/glunzunk.js';
import { exportGame } from './buildgame.js';

function exportPanel(state) {
	// resourcesPanel(false)
	if (state === true) {
		var panel = document.getElementById('export-panel');

		panel.classList.remove('fade-out');
		panel.classList.add('fade-in');
		
		panel.style.display = 'block';
		panel.style.pointerEvents = 'all'

	} else if (state === false) {
		var panel = document.getElementById('export-panel');

		panel.classList.remove('fade-in');
		panel.classList.add('fade-out');

		panel.style.pointerEvents = 'none'

		setTimeout(function() {
			panel.style.display = 'none';
		}, 200);

	} else if (state === 'toggle') {
		var panel = document.getElementById('export-panel');
		var panelStyleDisplay = window.getComputedStyle(panel).display;
		console.log(panelStyleDisplay)
		if (panelStyleDisplay === 'block') { // if code editor is visible
			exportPanel(false)
		} else if (panelStyleDisplay === 'none') {
			exportPanel(true)
		}
	}
};

document.querySelector('.web-export')?.addEventListener('click', (event) => {
	event.preventDefault()
	console.log('[Editor - exportpanel.js] Web Export Selected')
	document.getElementById('export-platform-title').textContent = 'Export your Game ( Web Build )'
	document.getElementById('export-list').classList.add('fade-out')

	document.getElementById('web-export-panel').classList.add('fade-in')
	document.getElementById('web-export-panel').style.display = 'block';
	document.getElementById('web-export-panel').style.pointerEvents = 'all'
});

document.getElementById('export-game-btn').onclick = function() {
  exportGame('web');
};

window.exportPanel = exportPanel
