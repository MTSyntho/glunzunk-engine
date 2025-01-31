/*
	Editor Functionality - Glunzunk Engine
	Written by: MTSyntho
	Multiple Snippets of Code taken from Babylon.JS Docs n Forums
	Sep 2024
*/

function ProjectManager(state) {
  var winbox = new WinBox({
	  title: 'Project Manager',
	  max: false,
	  top: '50px',
	  min: state,
	  class: [ "no-full", "no-close" ],
	  innerHTML: `
	  <p>might replace with embed instead of innerhtml</p>`,
	  overflow: true,
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("opentask");
		document.getElementById(winbox.id).classList.add("closetask");

		setTimeout(() => {
		  this.onclose = null;
		  this.close();
		  document.getElementById(winbox.id).remove();
		}, 200);

		return true;
	  }
  });
};

function InspectorPanel(state) {
  var winbox = new WinBox({
	  title: 'Inspector',
	  max: false,
	  top: '50px',
	  min: state,
	  class: [ "no-full", "no-close" ],
	  url: 'embed-panels/inspector/index.html',
	  overflow: true,
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("opentask");
		document.getElementById(winbox.id).classList.add("closetask");

		setTimeout(() => {
		  this.onclose = null;
		  this.close();
		  document.getElementById(winbox.id).remove();
		}, 200);

		return true;
	  }
  });
};

function ObjectsPanel(state) {
  var winbox = new WinBox({
	  title: 'Objects',
	  max: false,
	  top: '50px',
	  min: state,
	  class: [ "no-full", "no-close" ],
	  url: 'embed-panels/objectsPanel/index.html',
	  overflow: true,
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("opentask");
		document.getElementById(winbox.id).classList.add("closetask");

		setTimeout(() => {
		  this.onclose = null;
		  this.close();
		  document.getElementById(winbox.id).remove();
		}, 200);

		return true;
	  }
  });
};

ProjectManager(true);
InspectorPanel(true);
ObjectsPanel(true);

function windowCreateObject() {
  var winbox = new WinBox({
	  title: 'Choose an Object',
	  max: false,
	  top: '50px',
	  class: [ "no-full" ],
	  url: '/embed-panels/createObject/index.html',
	  overflow: true,
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("opentask");
		document.getElementById(winbox.id).classList.add("closetask");

		setTimeout(() => {
		  this.onclose = null;
		  this.close();
		  document.getElementById(winbox.id).remove();
		}, 200);

		return true;
	  }
  });
	window.addEventListener('message', function(event) {
		if (event.data == 'closeCurrentWindow') {
			winbox.close(true); 
		};
	});
};

// // Listen for messages from iframe (taken from zdkrimson)
// window.addEventListener('message', function(event) {
// 	if (event.data == 'windowCreateObject') {
// 		windowCreateObject();
// 	};

// 	if (event.data == '__create3DObj') {
// 		var esphere = BABYLON.MeshBuilder.CreateBox("cube", {width: 5, height: 5, depth: 5}, gzscene);
// 	};
// });

// // Get the canvas DOM element
// var canvas = document.getElementById('renderCanvas');
// // Load the 3D engine
// var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// // CreateScene function that creates and return the scene
// var createScene = function(){
// 	// Create a basic BJS Scene object
// 	var gzscene = new BABYLON.Scene(engine);
// 	// This creates and positions a free camera (non-mesh)
// 	var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), gzscene);
// 	gzscene.clearColor = new BABYLON.Color3(0.5, 0.5, 0.5);

// 	// camera.inputs.removeByType("FreeCameraKeyboardMoveInput");

// 	// thx to HirangaG on BabylonJS forums for this code snippet <3
// 	camera.attachControl(this.canvas, true);
// 	// camera.keysUpward.push(69); //increase elevation
// 	// camera.keysDownward.push(81); //decrease elevation
// 	// camera.keysUp.push(87); //forwards 
// 	// camera.keysDown.push(83); //backwards
// 	// camera.keysLeft.push(65);
// 	// camera.keysRight.push(68);

// 	// Movement controls (WASD)
// 	camera.keysUp.push(87);    // W
// 	camera.keysDown.push(83);  // S
// 	camera.keysLeft.push(65);  // A
// 	camera.keysRight.push(68); // D

// 	// Rotation controls (Arrow keys)
// 	const rotationSensibility = 0.01; // Adjust this value for sensitivity
// 	canvas.addEventListener('keydown', (e) => {
// 	    if (e.keyCode === 37) { // Left arrow
// 	        camera.cameraRotation.y -= rotationSensibility;
// 	    } else if (e.keyCode === 39) { // Right arrow
// 	        camera.cameraRotation.y += rotationSensibility;
// 	    }
// 	});

	// // thx to nogalo on BabylonJS forums for this code snippet :3
	// canvas.addEventListener('keydown', (e)=>{
	// 	if (e.keyCode == 37) { // left arrow key
	// 		camera.cameraRotation.y -= 0.01;
	// 	}
	// 	else if (e.keyCode == 39) { // right arrow key
	// 		camera.cameraRotation.y += 0.01;
	// 	}
	// });

	// const FreeCameraKeyboardRotateInput = function () {
	//   this._keys = [];
	//   this.keysLeft = [39];
	//   this.keysRight = [37];
	//   this.sensibility = 0.005;
	// };

	// FreeCameraKeyboardRotateInput.prototype.getClassName = function () {
	//   return "FreeCameraKeyboardRotateInput";
	// };
	// FreeCameraKeyboardRotateInput.prototype.getSimpleName = function () {
	//   return "keyboardRotate";
	// };

	// FreeCameraKeyboardRotateInput.prototype.attachControl = function (noPreventDefault) {
	//   const _this = this;
	//   const engine = this.camera.getEngine();
	//   const element = engine.getInputElement();
	//   if (!this._onKeyDown) {
	//     element.tabIndex = 1;
	//     this._onKeyDown = function (evt) {
	//       if (_this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1) {
	//         const index = _this._keys.indexOf(evt.keyCode);
	//         if (index === -1) {
	//           _this._keys.push(evt.keyCode);
	//         }
	//         if (!noPreventDefault) {
	//           evt.preventDefault();
	//         }
	//       }
	//     };
	//     this._onKeyUp = function (evt) {
	//       if (_this.keysLeft.indexOf(evt.keyCode) !== -1 || _this.keysRight.indexOf(evt.keyCode) !== -1) {
	//         const index = _this._keys.indexOf(evt.keyCode);
	//         if (index >= 0) {
	//           _this._keys.splice(index, 1);
	//         }
	//         if (!noPreventDefault) {
	//           evt.preventDefault();
	//         }
	//       }
	//     };

	//     element.addEventListener("keydown", this._onKeyDown, false);
	//     element.addEventListener("keyup", this._onKeyUp, false);
	//     BABYLON.Tools.RegisterTopRootEvents(canvas, [{ name: "blur", handler: this._onLostFocus }]);
	//   }
	// };

	// FreeCameraKeyboardRotateInput.prototype.detachControl = function () {
	//   const engine = this.camera.getEngine();
	//   const element = engine.getInputElement();
	//   if (this._onKeyDown) {
	//     element.removeEventListener("keydown", this._onKeyDown);
	//     element.removeEventListener("keyup", this._onKeyUp);
	//     BABYLON.Tools.UnregisterTopRootEvents(canvas, [{ name: "blur", handler: this._onLostFocus }]);
	//     this._keys = [];
	//     this._onKeyDown = null;
	//     this._onKeyUp = null;
	//   }
	// };

	// FreeCameraKeyboardRotateInput.prototype.checkInputs = function () {
	//   if (this._onKeyDown) {
	//     const camera = this.camera;
	//     // Keyboard
	//     for (let index = 0; index < this._keys.length; index++) {
	//       const keyCode = this._keys[index];
	//       if (this.keysLeft.indexOf(keyCode) !== -1) {
	//         camera.cameraRotation.y += this.sensibility;
	//       } else if (this.keysRight.indexOf(keyCode) !== -1) {
	//         camera.cameraRotation.y -= this.sensibility;
	//       }
	//     }
	//   }
	// };

	// camera.inputs.add(new FreeCameraKeyboardRotateInput());

	// camera.inputs.removeByType("FreeCameraKeyboardMoveInput");
	// const FreeCameraKeyboardRotateInput = function () {
	//   this._keys = [];
	//   this.keysLeft = [37];
	//   this.keysRight = [39];
	//   this.sensibility = 0.01;
	// };

// 	// Activate Gizmo Manager (Move, Scale & Rotation)
// 	const gizmoManager = new BABYLON.GizmoManager(gzscene);
	
// 	function showGizmo(state) {
// 		if (state == 'position') {
// 			gizmoManager.positionGizmoEnabled = true;
// 			gizmoManager.rotationGizmoEnabled = false;
// 			gizmoManager.scaleGizmoEnabled = false;
// 			gizmoManager.boundingBoxGizmoEnabled = false;
// 		};
// 		if (state == 'rotation') {
// 			gizmoManager.positionGizmoEnabled = false;
// 			gizmoManager.rotationGizmoEnabled = true;
// 			gizmoManager.scaleGizmoEnabled = false;
// 			gizmoManager.boundingBoxGizmoEnabled = false;
// 		};
// 		if (state == 'scale') {
// 			gizmoManager.positionGizmoEnabled = false;
// 			gizmoManager.scaleGizmoEnabled = true;
// 			gizmoManager.rotationGizmoEnabled = false;
// 			gizmoManager.boundingBoxGizmoEnabled = false;
// 		};
// 		if (state == 'hitbox' || state == '') {
// 			gizmoManager.boundingBoxGizmoEnabled = true;
// 			gizmoManager.positionGizmoEnabled = false;
// 			gizmoManager.rotationGizmoEnabled = false;
// 			gizmoManager.scaleGizmoEnabled = false;
// 		};
// 	};

// 	// function hideGizmo(state) {
// 	//     if (state == 'position') {
// 	//         gizmoManager.positionGizmoEnabled = false;
// 	//     };
// 	//     if (state == 'rotation') {
// 	//         gizmoManager.rotationGizmoEnabled = false;
// 	//     };
// 	//     if (state == 'scale') {
// 	//         gizmoManager.scaleGizmoEnabled = false;
// 	//     };
// 	//     if (state == 'hitbox' || state == '') {
// 	//         gizmoManager.boundingBoxGizmoEnabled = false;
// 	//     };
// 	// };

// 	window.showGizmo = showGizmo;

// 	showGizmo('position');

// 	// Enable mouse wheel inputs.
// 	camera.inputs.addMouseWheel();
	
// 	// Change the mouse wheel Y axis to controll the cameras height in the scene:
// 	//camera.inputs.attached["mousewheel"].wheelYMoveRelative = BABYLON.Coordinate.Y;
	
// 	// Revese the mouse wheel Y axis direction:
// 	// camera.inputs.attached["mousewheel"].wheelPrecisionY = -1;

// 	// Import Scene into Editor
// 	__defaultGlunzunkProject(camera);

// 	return gzscene;

// };


// // Keybinds 
// $(document).on("keypress", function(event) {
// 	switch (event.key) {
// 		case '1':
// 			showGizmo('position');
// 			break;
// 		case '2':
// 			showGizmo('rotation');
// 			break;
// 		case '3':
// 			showGizmo('scale');
// 			break;
// 	}
// });

// // call the createScene function
// var gzscene = createScene();
// // run the render loop
// engine.runRenderLoop(function(){
// 	gzscene.render();
// });
// // the canvas/window resize event handler
// window.addEventListener('resize', function(){
// 	engine.resize();
// });