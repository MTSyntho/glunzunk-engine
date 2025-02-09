import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
// import { objects } from './../../default-project.js';
import { scene, gizmoObjects, sceneObjects } from './../../editor/init.js';

var newObject = null;

gzjs.newObject = function(name, type, color, size, position) {
		switch (type) {
		    case 'box':
		        newObject = new THREE.Mesh(
		            new THREE.BoxGeometry(size[0], size[1], size[2]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'capsule':
		    case 'bean':  // 'bean' and 'capsule' both trigger the same case
		        newObject = new THREE.Mesh(
		            new THREE.CapsuleGeometry(size[0], size[1], size[2], size[3]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'circle':
		        newObject = new THREE.Mesh(
		            new THREE.CircleGeometry(size[0], size[1], size[2], size[3]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'cone':
		   	case 'vlc':
		   		newObject = new THREE.Mesh(
		            new THREE.ConeGeometry(size[0], size[1], size[2], size[3], size[4], size[5], size[6]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'cylinder':
		    	newObject = new THREE.Mesh(
		            new THREE.CylinderGeometry(size[0], size[1], size[2], size[3], size[4], size[5], size[6], size[7]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;
		    case 'dodecahedron':
		    case 'hedron1':
		    	newObject = new THREE.Mesh(
		            new THREE.DodecahedronGeometry(size[0], size[1]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'icosahedron':
		    case 'hedron2':
		    	newObject = new THREE.Mesh(
		            new THREE.IsosahedronGeometry(size[0], size[1], size[2], size[3], size[4], size[5], size[6]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'lathe':
		    	newObject = new THREE.Mesh(
		            new THREE.LatheGeometry(size[0], size[1], size[2]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'octahedron':
		    case 'hedron3':
		    	newObject = new THREE.Mesh(
		            new THREE.OctahedronGeometry(size[0], size[1]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'plane':
		    	newObject = new THREE.Mesh(
		            new THREE.PlaneGeometry(size[0], size[1], size[2], size[3]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'ring':
		    case 'cd':
		    case 'disc':
		   		newObject = new THREE.Mesh(
		            new THREE.RingGeometry(size[0], size[1], size[2], size[3], size[4], size[5]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'sphere':
		    case 'ball':
		    	newObject = new THREE.Mesh(
		            new THREE.SphereGeometry(size[0], size[1], size[2], size[3], size[4], size[5], size[6]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'tetrahedron':
		    case 'hedron4':
		    	newObject = new THREE.Mesh(
		            new THREE.TetrahedronGeometry(size[0], size[1]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'torus':
		   	case 'donut':
		   		newObject = new THREE.Mesh(
		            new THREE.TorusGeometry(size[0], size[1], size[2], size[3], size[4]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'torusknot':
		    	newObject = new THREE.Mesh(
		            new THREE.TorusKnotGeometry(size[0], size[1], size[2], size[3], size[4], size[5]),
		            new THREE.MeshStandardMaterial({ color: Number(color) })
		        );
		        break;

		    case 'camera':
		    	newObject = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
		    	break;

		    default:
		        // Handle the case if type is none of the above
		        console.error('Unknown type:', type);
		        return;
		}

		// Set object position
		newObject.position.set(position[0], position[1], position[2]);

		newObject.castShadow = true;
		newObject.receiveShadow = true;

		gizmoObjects.push( newObject )

		sceneObjects[newObject.uuid] = name

		scene.add( newObject )
};

export { newObject };