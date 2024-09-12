/*
    Editor Functionality - Glunzunk Engine
    Written by: MTSyntho
    Multiple Snippets of Code taken from Babylon.JS Docs n Forums
    Sep 2024
*/

function SceneExplorer(state) {
  var winbox = new WinBox({
      title: 'Scene Explorer',
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

function ObjectsPanel(state) {
  var winbox = new WinBox({
      title: 'Project Objects',
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

SceneExplorer(true);
InspectorPanel(true);
ObjectsPanel(true);

function windowCreateObject() {
  var winbox = new WinBox({
      title: 'Choose an Object',
      max: false,
      top: '50px',
      class: [ "no-full" ],
      url: 'embed-panels/createObject/index.html',
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

// Listen for messages from iframe (taken from zdkrimson)
window.addEventListener('message', function(event) {
    if (event.data == 'windowCreateObject') {
        windowCreateObject();
    };
});

// Get the canvas DOM element
var canvas = document.getElementById('renderCanvas');
// Load the 3D engine
var engine = new BABYLON.Engine(canvas, true, {preserveDrawingBuffer: true, stencil: true});
// CreateScene function that creates and return the scene
var createScene = function(){
    // Create a basic BJS Scene object
    var scene = new BABYLON.Scene(engine);
    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // Enable mouse wheel inputs.
    camera.inputs.addMouseWheel();
    
    // Change the mouse wheel Y axis to controll the cameras height in the scene:
    //camera.inputs.attached["mousewheel"].wheelYMoveRelative = BABYLON.Coordinate.Y;
    
    // Revese the mouse wheel Y axis direction:
    // camera.inputs.attached["mousewheel"].wheelPrecisionY = -1;

    // Import Scene into Editor
    __defaultGlunzunkProject(camera);

    return scene;

};
// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function(){
    scene.render();
});
// the canvas/window resize event handler
window.addEventListener('resize', function(){
    engine.resize();
});