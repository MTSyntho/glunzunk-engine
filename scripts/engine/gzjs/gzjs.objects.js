import * as THREE from 'three';
import { gzjs } from './../glunzunk.js';
// import { objects } from './../../default-project.js';
import { scene, gizmoObjects, sceneObjects } from './../../editor/init.js';

var object = null
function createMaterial(type, options) {
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
        return new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    }

    if (!geometryMap[type]) {
        console.error('Unknown type:', type);
        return null;
    }

    const materialOptions = { color: Number(color), ...materialProps };
    object = new THREE.Mesh(geometryMap[type](), createMaterial(materialType, materialOptions));

    object.position.set(...position);
    object.castShadow = true;
    object.receiveShadow = true;

		gizmoObjects.push( object )

		sceneObjects[object.uuid] = name

    scene.add(object);
    return object;
};

export { object };
 