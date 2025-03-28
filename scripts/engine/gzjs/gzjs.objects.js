import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
// import { objects } from './../../default-project.js';
import { scene, gizmoObjects, sceneObjects, inEngine } from './../../editor/init.js';

var object = null
gzjs.createMaterial = function(type, options) {
    switch (type) {
        case 'basic': return new THREE.MeshBasicMaterial(options);
        case 'depth': return new THREE.MeshDepthMaterial(options);
        case 'lambert': return new THREE.MeshLambertMaterial(options);
        case 'matcap': return new THREE.MeshMatcapMaterial(options);
        case 'normal': return new THREE.MeshNormalMaterial(options);
        case 'phong': return new THREE.MeshPhongMaterial(options);
        case 'physical': return new THREE.MeshPhysicalMaterial(options);
        case 'standard': return new THREE.MeshStandardMaterial(options);
        case 'toon': return new THREE.MeshToonMaterial(options);
        default: return new THREE.MeshStandardMaterial(options);
    }
}

gzjs.newObject = function(name, type, color, position, params = {}, materialType = 'standard', materialProps = {}){
    const geometryMap = {
        'box': () => new THREE.BoxGeometry(params.width || 1, params.height || 1, params.depth || 1),
        'capsule': () => new THREE.CapsuleGeometry(params.radius || 1, params.length || 2, params.capSegments || 4, params.radialSegments || 8),
        'circle': () => new THREE.CircleGeometry(params.radius || 1, params.segments || 32, params.thetaStart || 0, params.thetaLength || Math.PI * 2),
        'cone': () => new THREE.ConeGeometry(params.radius || 1, params.height || 2, params.radialSegments || 8, params.heightSegments || 1, params.openEnded || false, params.thetaStart || 0, params.thetaLength || Math.PI * 2),
        'cylinder': () => new THREE.CylinderGeometry(params.radiusTop || 1, params.radiusBottom || 1, params.height || 2, params.radialSegments || 8, params.heightSegments || 1, params.openEnded || false, params.thetaStart || 0, params.thetaLength || Math.PI * 2),
        'dodecahedron': () => new THREE.DodecahedronGeometry(params.radius || 1, params.detail || 0),
        'icosahedron': () => new THREE.IcosahedronGeometry(params.radius || 1, params.detail || 0),
        'lathe': () => new THREE.LatheGeometry(params.points || [], params.segments || 12, params.phiStart || 0, params.phiLength || Math.PI * 2),
        'octahedron': () => new THREE.OctahedronGeometry(params.radius || 1, params.detail || 0),
        'plane': () => new THREE.PlaneGeometry(params.width || 1, params.height || 1, params.widthSegments || 1, params.heightSegments || 1),
        'ring': () => new THREE.RingGeometry(params.innerRadius || 0.5, params.outerRadius || 1, params.thetaSegments || 8, params.phiSegments || 1, params.thetaStart || 0, params.thetaLength || Math.PI * 2),
        'sphere': () => new THREE.SphereGeometry(params.radius || 1, params.widthSegments || 32, params.heightSegments || 16, params.phiStart || 0, params.phiLength || Math.PI * 2, params.thetaStart || 0, params.thetaLength || Math.PI),
        'tetrahedron': () => new THREE.TetrahedronGeometry(params.radius || 1, params.detail || 0),
        'torus': () => new THREE.TorusGeometry(params.radius || 1, params.tube || 0.4, params.radialSegments || 8, params.tubularSegments || 6, params.arc || Math.PI * 2),
        'torusknot': () => new THREE.TorusKnotGeometry(params.radius || 1, params.tube || 0.4, params.tubularSegments || 64, params.radialSegments || 8, params.p || 2, params.q || 3),
    };

    if (type === 'camera') {
        if (inEngine === true) {
            const helper = new THREE.CameraHelper( camera );
            scene.add( helper );            
        }

        return new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    if (!geometryMap[type]) {
        console.error('Unknown type:', type);
        return null;
    }


    const materialOptions = { color: Number(color), ...materialProps };
    object = new THREE.Mesh(geometryMap[type](), gzjs.createMaterial(materialType, materialOptions));

    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    object.name = name;

		gizmoObjects.push( object )

		sceneObjects[object.uuid] = name

    scene.add(object);
    return object;
};


gzjs.newCamera = function(name, type, position, rotation, params = {}) {
    var camera = null;
    if (type === 'perspective' || type === 'PerspectiveCamera') {
        camera = new THREE.PerspectiveCamera(params.fov || 60, params.aspect || window.innerWidth / window.innerHeight, params.near || 0.1, params.far || 2000)   
    }  
    // } else if (type === 'orthographic' || type === 'OrthographicCamera') {
    //     camera = new THREE.PerspectiveCamera(params.fov || 60, params.aspect || window.innerWidth / window.innerHeight, params.near || 0.1, params.far || 2000, params.zoom || 1)
    //     camera.name = name;           
    // }

    camera.name = name;   
    camera.position.set(...position)
    // camera.rotation.set( rotation.x, rotation.y, rotation.z )

    const cameraHitbox = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),  // Adjust size if needed
        new THREE.MeshBasicMaterial({ color: 0xff0000, visible: false }) // Invisible box
    );

    cameraHitbox.position.copy(camera.position);
    cameraHitbox.userData.isCameraHitbox = true; // Mark as camera hitbox
    // camera.userData.isCamera = true; // Mark as actual camera
    cameraHitbox.userData.cameraName = name
    
    gizmoObjects.push( cameraHitbox )
    sceneObjects[camera.uuid] = name

    scene.add( camera );
    scene.add( cameraHitbox );

    camera.matrixAutoUpdate = true; 
    camera.updateProjectionMatrix();

    camera.userData.isSelectable = true;

    if (inEngine === true) {
        const helper = new THREE.CameraHelper( camera );
        scene.add( helper );            
    }    

    return camera;
}

// if (object.material.opacity < 1) {
//     object.material.transparent = true
// } else {
//     object.material.transparent = false
// }

export { object };
 