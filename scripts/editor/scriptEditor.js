// document.addEventListener('DOMContentLoaded', function () {
// 	var codemirror = CodeMirror.fromTextArea(document.querySelector('#script-editor textarea'), {
//       lineNumbers: true,       // Show line numbers
//       mode: "javascript",      // Syntax highlighting for JavaScript
//       theme: "glunzunk",        // Set the theme for the editor
//       matchBrackets: true,     // Highlight matching brackets
//       extraKeys: {
//         "Ctrl-Space": "autocomplete" // Enable autocomplete on Ctrl+Space
//       }

//     });
// });

function codeEditor(state) {
	if (state === true) {
		var scriptEditor = document.getElementById('script-editor');
		var sceneEditor = document.getElementById('renderCanvas');

		scriptEditor.classList.remove('fade-out');
		sceneEditor.classList.remove('fade-in');

		scriptEditor.classList.add('fade-in');
		sceneEditor.classList.add('fade-out');

		scriptEditor.style.display = 'block';
		// sceneEditor.style.display = 'none';
		scriptEditor.style.pointerEvents = 'all'
		sceneEditor.style.pointerEvents = 'none'

		setTimeout(function() {
		    sceneEditor.style.display = 'none';
		}, 200);

	} else if (state === false) {
		var scriptEditor = document.getElementById('script-editor');
		var sceneEditor = document.getElementById('renderCanvas');

		scriptEditor.classList.remove('fade-in');
		sceneEditor.classList.remove('fade-out');

		scriptEditor.classList.add('fade-out');
		sceneEditor.classList.add('fade-in');

		// scriptEditor.style.display = 'none';
		sceneEditor.style.display = 'block';
		scriptEditor.style.pointerEvents = 'none'
		sceneEditor.style.pointerEvents = 'all'		

		setTimeout(function() {
		    scriptEditor.style.display = 'none';
		}, 200);

	} else if (state === 'toggle') {
		var scriptEditor = document.getElementById('script-editor');
		var scriptEditorStyleDisplay = window.getComputedStyle(scriptEditor).display;
		console.log(scriptEditorStyleDisplay)
		if (scriptEditorStyleDisplay === 'block') { // if code editor is visible
			codeEditor(false)
		} else if (scriptEditorStyleDisplay === 'none') {
			codeEditor(true)
		}
	}
};