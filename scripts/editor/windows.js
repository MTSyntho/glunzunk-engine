/*
	Editor Windows - Glunzunk Engine
	Written by: MTSyntho
	Jan 2025
*/

import { gzjs } from './../engine/glunzunk.js';

var focusedWindows  = []

function ProjectManager(state) {
  var winbox = new WinBox({
	  title: 'Project Manager',
	  max: false,
	  top: '50px',
	  // min: state,
	  class: [ "no-full", "no-close" ],
	  innerHTML: `
	  <p>might replace with embed instead of innerhtml</p>`,
	  overflow: true,
	  onfocus: function(){
			focusedWindows.push( this.id )
	  },
	  onblur: function(){
	  	focusedWindows = focusedWindows.filter(id => id !== this.id);
	  },
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("windowOpen");
		document.getElementById(winbox.id).classList.add("windowClose");

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
	  overflow: true,
	  onfocus: function(){
			focusedWindows.push( this.id )
	  },
	  onblur: function(){
	  	focusedWindows = focusedWindows.filter(id => id !== this.id);
	  },
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("windowOpen");
		document.getElementById(winbox.id).classList.add("windowClose");

		setTimeout(() => {
		  this.onclose = null;
		  this.close();
		  document.getElementById(winbox.id).remove();
		}, 200);

		return true;
	  }
  });	  
  document.getElementById(winbox.id).setAttribute('codename', 'gz-inspector')
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
	  onfocus: function(){
			focusedWindows.push( this.id )
	  },
	  onblur: function(){
	  	focusedWindows = focusedWindows.filter(id => id !== this.id);
	  },
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("windowOpen");
		document.getElementById(winbox.id).classList.add("windowClose");

		setTimeout(() => {
		  this.onclose = null;
		  this.close();
		  document.getElementById(winbox.id).remove();
		}, 200);

		return true;
	  }
  });
};

// ProjectManager(true);
try {
	InspectorPanel(true);
	ObjectsPanel(true);	
	MaterialPanel(true);
} catch (error) {
	console.error('Failed to initialize windows: ' +  error)
}

function MaterialPanel(state) {
  var winbox = new WinBox({
	  title: 'Material Editor',
	  max: false,
	  min: state,
	  top: '50px',
	  class: [ "no-full", "no-close" ],
	  // onminimize: function(){
		// 	document.getElementById(winbox.id).classList.remove("windowOpen");
		// 	document.getElementById(winbox.id).classList.add("windowClose");	  	
	  // },
	  // oncreate: function(){

	  // },
	  onfocus: function(){
			focusedWindows.push( this.id )
	  },
	  onblur: function(){
	  	focusedWindows = focusedWindows.filter(id => id !== this.id);
	  },
	  overflow: true,
	  onclose: function(){
			this.g.classList.add("windowClose");
			document.getElementById(winbox.id).classList.remove("windowOpen");
			document.getElementById(winbox.id).classList.add("windowClose");

			setTimeout(() => {
			  this.onclose = null;
			  this.close();
			  document.getElementById(winbox.id).remove();
			}, 200);

			return true;
	  }
  });
  document.getElementById(winbox.id).setAttribute('codename', 'gz-material')
};

function windowCreateObject() {
  var winbox = new WinBox({
	  title: 'Choose an Object',
	  max: false,
	  top: '50px',
	  class: [ "no-full" ],
	  url: './embed-panels/createObject/index.html',
	  overflow: true,
	  onclose: function(){
		this.g.classList.add("windowClose");
		document.getElementById(winbox.id).classList.remove("windowOpen");
		document.getElementById(winbox.id).classList.add("windowClose");

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

export { focusedWindows, MaterialPanel }

// Listen for messages from iframe (taken from zdkrimson)
window.addEventListener('message', function(event) {
	if (event.data == 'windowCreateObject') {
		windowCreateObject();
	};

	if (event.data == '__create3DObj') {
		gzjs.newObject(
			'newobj' + Math.random(0,9999),
		  'box',
		  0xff0000,
		  [2, 1, 1],
		  [0, 0 ,0]
		);
	}

	if (event.data == '__create3DCam') {
		gzjs.newCamera(
			'camera' + Math.random(0,9999),
			'perspective',
			[0, 0, 0],
			[0, 0, 0]
		)
	}
});