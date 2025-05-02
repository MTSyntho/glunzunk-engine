import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
// import { objects } from './../../default-project.js';
import { scene, gizmoObjects, sceneObjects, inEngine } from './../../editor/init.js';

var object = null
gzjs.createMaterial = function(type, options, textures) {
    let material;    
    switch (type) {
        case 'basic': material = new THREE.MeshBasicMaterial(options); break;
        case 'depth': material = new THREE.MeshDepthMaterial(options); break;
        case 'lambert': material = new THREE.MeshLambertMaterial(options); break;
        case 'matcap': material = new THREE.MeshMatcapMaterial(options); break;
        case 'normal': material = new THREE.MeshNormalMaterial(options); break;
        case 'phong': material = new THREE.MeshPhongMaterial(options); break;
        case 'physical': material = new THREE.MeshPhysicalMaterial(options); break;
        case 'standard': material = new THREE.MeshStandardMaterial(options); break;
        case 'toon': material = new THREE.MeshToonMaterial(options); break;
        default: material = new THREE.MeshStandardMaterial(options); break;
    }

    // console.log(textures)


    if (textures.textures) {
        Object.keys(textures.textures).forEach(key => {
            // console.log(textures.textures)
            if (key in material) {
                material[key] = textures.textures[key];
            }
        });
    }

    return material;
}

gzjs.newObject = function(name, type, color, position, params = {}, materialType = 'standard', materialProps = {}, materialTextures = {}){
    const geometryMap = {
        'box': () => new THREE.BoxGeometry(params.width || 1, params.height || 1, params.depth || 1, params.widthSegments || 1, params.heightSegments || 1, params.depthSegments || 1),
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

    for (let key in materialProps) {
        if (typeof materialProps[key] === 'string' && materialProps[key].startsWith('0x')) {
            materialProps[key] = Number(materialProps[key]);
        }
    }

    const materialOptions = { color: Number(color), ...materialProps };

    // diff = gzjs.texture('Diffuse')
    // Object.entries(materialTextures).forEach(([key, obj]) => {

    // });

    const material = gzjs.createMaterial(materialType, materialOptions, materialTextures);

    // console.log(materialTextures)
    object = new THREE.Mesh(geometryMap[type](), material);

    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;
    object.name = name;
    // object.geometry.

	gizmoObjects.push( object )

	sceneObjects[object.uuid] = name

    console.log(object)

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
 