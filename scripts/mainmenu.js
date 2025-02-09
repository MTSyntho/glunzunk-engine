/*
	Glunzunk Engine Main Menu Functionality
	Written by: MTSyntho
	Sep 2024
*/

function projectdialog(status) {
	var overlay = document.getElementById("overlay");
	var main = document.getElementById("main");
	var name = document.getElementById("projectdialogname");

	if (status == "show") {
		overlay.classList.add("fadeIn");
		overlay.classList.remove("fadeOut");
		name.value="";
	}

	if (status == "hide") {
		overlay.classList.remove("fadeIn");
		overlay.classList.add("fadeOut");
	}
}

function openDatabase() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open('gz', 1);
		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains('projects')) {
				db.createObjectStore('projects', { keyPath: "id", autoIncrement: true });
			}
		};
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

function openEditor(name) {
	const loading = document.getElementById('loading-screen');

	loading.classList.add('fadeIn')

	localStorage.setItem('editorProject', name)

	window.location.href = 'editor.html';
}

// Function to prompt user to select a folder
async function createProject() {
 	try {
		const db = await openDatabase();
		const transaction = db.transaction('projects', "readwrite");
		const store = transaction.objectStore('projects');

		const projectmeta = {
		 	name: document.getElementById('projectdialogname').value,
		 	description: "A Glunzunk Engine Game.",
		 	version: "1.0.0",
		 	engineVersion: "",
		 	developer: ""
		};

		store.put(projectmeta, `projects/${document.getElementById('projectdialogname').value}`)

		const projectlist = document.getElementById('projectlist')

		// Create a tag for interaction
		const project = document.createElement('a');

		// Create project button
		const div = document.createElement('div');
		div.classList.add('projectoption');

		// Add project name
		const p = document.createElement('p');
		p.textContent = document.getElementById('projectdialogname').value

		// Add project name to button
		div.appendChild(p);

        div.onclick = () => openEditor(document.getElementById('projectdialogname').value)

		// Add project button to a tag.
		project.appendChild(div);

		// Add project element to project list
		projectlist.appendChild(project);

		var overlay = document.getElementById("overlay");
		overlay.classList.remove('fadeIn')
		overlay.classList.add('fadeOut')

		const note = document.getElementById('noprojects');
		note.style.display = 'none'
	} catch (err) {
		console.error('Error picking folder:', err);
	}
}

// function fetchProjects() {
// 	const db = await openDatabase();
// 	return new Promise((resolve) => {
// 		const transaction = db.transaction('projects', "readonly");
// 		const store = transaction.objectStore('projects');
// 		const request = store.getAll();
// 		request.onsuccess = () => resolve(request.result);
// 	});

// 	if (directories.length === 0) {
// 		console.log('No projects saved.');
// 		return
// 	} else {
// 		directories.forEach((dir, index) => {
// 			console.log(`Directory ${index + 1}: ${dir.name}`);
// 			return dir.name
// 	  });
// 	}
// }

async function loadProjects() {
    try {
        const db = await openDatabase(); // Open IndexedDB

        const transaction = db.transaction('projects', "readonly");
        const store = transaction.objectStore('projects');
        const request = store.getAll();

        request.onsuccess = () => {
            const directories = request.result;
            const note = document.getElementById('noprojects');
            const projectlist = document.getElementById('projectlist');

            if (directories.length === 0) {
                console.log('No projects saved.');
                note.style.display = 'block'; // Corrected display property
            } else {
                note.style.display = 'none';

                directories.forEach((dir, index) => {
                    // Create a tag for interaction
                    const project = document.createElement('a');

                    // Create project button
                    const div = document.createElement('div');
                    div.classList.add('projectoption');

                    // Add project name
                    const p = document.createElement('p');
                    p.textContent = dir.name;

                    // Add project name to button
                    div.appendChild(p);

                    div.onclick = () => openEditor(dir.name)

                    // Add project button to a tag
                    project.appendChild(div);

                    // Add project element to project list
                    projectlist.appendChild(project);

                    // console.log(`Directory ${index + 1}: ${dir.name}`);
                });
            }
        };

        request.onerror = () => {
            console.error('Failed to fetch projects');
        };

    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjects(); // Calls the async function
});

// // Call the function when you want to trigger the folder picker
// document.querySelector('#selectFolderButton').addEventListener('click', requestFolderAccess);

// async function createproject() {
//   try {
//     const dirHandle = await window.showDirectoryPicker();
	
//     // You can now work with the directory handle (dirHandle)
//     console.log("Selected directory:", dirHandle.name);
	
//     // Example: List all files in the selected directory
//     const iterator = await dirHandle.values();
//     for await (const entry of iterator) {
//       console.log("File:", entry.name);
//     }

//   } catch (err) {
//     console.error("Error selecting directory:", err);
//   }
// }

// function createproject() {
//   try {
//     var overlay = document.getElementById("overlay");
//     overlay.classList.remove('fadeIn')
//     overlay.classList.add('fadeOut')
//   } catch (err) {
//     console.error("Error selecting directory:", err);
//   }
// }

// thx chatgtp