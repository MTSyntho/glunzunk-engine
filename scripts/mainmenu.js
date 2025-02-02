/*
	Glunzunk Engine Main Menu Functionality
	Written by: MTSyntho
	Sep 2024
*/

function projectdialog(status) {
	var overlay = document.getElementById("overlay");
	var main = document.getElementById("main");
	var name = document.getElementById("name");

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


// Function to prompt user to select a folder
async function createProject() {
  try {
	// Open a folder picker
	const folderHandle = await window.showDirectoryPicker();

	// Get the current directories from localStorage, or initialize an empty array if none exist
	let directories = JSON.parse(localStorage.getItem('savedProjects')) || [];

	// Add the new directory's path to the array (you can store other details here as well)
	directories.push({ name: folderHandle.name}); // You can store more data as needed

	// Save the updated list back to localStorage
	localStorage.setItem('savedProjects', JSON.stringify(directories));
	
	// You can now read and write files to the folder
	console.log('Selected folder:', folderHandle);

	// Example: Read the content of the folder
	for await (const entry of folderHandle.values()) {
		console.log(entry.kind, entry.name);

		const projectlist = document.getElementById('projectlist')

		// Create a tag for interaction
		const project = document.createElement('a');

		// Create project button
		const div = document.createElement('div');
		div.classList.add('projectoption');

		// Add project name
		const p = document.createElement('p');
		p.textContent = entry.name;

		// Add project name to button
		div.appendChild(p);

		// Add project button to a tag.
		project.appendChild(div);

		// Add project element to project list
		projectlist.appendChild(project);

		const note = document.getElementById('noprojects');
		note.style.display = 'none'
	}

	var overlay = document.getElementById("overlay");
	overlay.classList.remove('fadeIn')
	overlay.classList.add('fadeOut')

  } catch (err) {
	console.error('Error picking folder:', err);
  }
}

function fetchProjects() {
	const directories = JSON.parse(localStorage.getItem('savedProjects')) || [];

	if (directories.length === 0) {
		console.log('No projects saved.');
		return
	} else {
		directories.forEach((dir, index) => {
			console.log(`Directory ${index + 1}: ${dir.name}`);
			return dir.name
	  });
	}
}

// Create projects
document.addEventListener('DOMContentLoaded', () => {
	const directories = JSON.parse(localStorage.getItem('savedProjects')) || [];

	if (directories.length === 0) {
		console.log('No projects saved.');
		const note = document.getElementById('noprojects');
		note.style.display = 'all'
		return
	} else {
		const note = document.getElementById('noprojects');
		note.style.display = 'none'
		directories.forEach((dir, index) => {
			const projectlist = document.getElementById('projectlist')

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

			// Add project button to a tag.
			project.appendChild(div);

			// Add project element to project list
			projectlist.appendChild(project);

			console.log(`Directory ${index + 1}: ${dir.name}`);
			return dir.name
	  });
	}
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