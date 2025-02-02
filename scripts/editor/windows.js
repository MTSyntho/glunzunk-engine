/*
	Editor Windows - Glunzunk Engine
	Written by: MTSyntho
	Jan 2025
*/

import { gzjs } from './../engine/glunzunk.js';

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
	  url: './embed-panels/createObject/index.html',
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

// Listen for messages from iframe (taken from zdkrimson)
window.addEventListener('message', function(event) {
	if (event.data == 'windowCreateObject') {
		windowCreateObject();
	};

	if (event.data == '__create3DObj') {
		gzjs.newObject('cube', 0xff0000, [2, 1, 1], 1)
	};
});