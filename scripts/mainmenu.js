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
//     var main = document.getElementById("main");
//     var overlay = document.getElementById("overlay");
//     main.classList.remove('fadeIn')
//     main.classList.add('fadeOut')
//     overlay.classList.remove('fadeIn')
//     overlay.classList.add('fadeOut')
//   } catch (err) {
//     console.error("Error selecting directory:", err);
//   }
// }

function createproject() {
  try {
    var overlay = document.getElementById("overlay");
    overlay.classList.remove('fadeIn')
    overlay.classList.add('fadeOut')
  } catch (err) {
    console.error("Error selecting directory:", err);
  }
}

// thx chatgtp