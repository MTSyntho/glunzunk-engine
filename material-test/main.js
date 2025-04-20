import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ canvas: renderCanvas, antialias:false });
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setPixelRatio(0.5)

renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 0.7;

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);

const clock = new THREE.Clock();

    // Create Sky
    const skyBG = new Sky();
    skyBG.scale.setScalar( 450000 );
    scene.add( skyBG );


    const phi = THREE.MathUtils.degToRad( 90 - 5 );
    const theta = THREE.MathUtils.degToRad( 180 );
    const sunPosition = new THREE.Vector3().setFromSphericalCoords( 1, phi, theta );

    const skyUniforms = skyBG.material.uniforms;
    skyUniforms['turbidity'].value = 11.4;
    skyUniforms['rayleigh'].value = 3;
    skyUniforms['mieCoefficient'].value = 0.004;
    skyUniforms['mieDirectionalG'].value = 0.619;
    skyUniforms['sunPosition'].value = sunPosition

    // Sunlight
    const sunLight = new THREE.DirectionalLight( 0xffffff, 10 ); // Bright white light
    sunLight.position.copy(sunPosition).multiplyScalar(100); // Move light far away
    scene.add( sunLight );

const hemisphere = new THREE.HemisphereLight( 0xffffff , 0x4e4e4e , 5 );
scene.add ( hemisphere )

const textureLoader = new THREE.TextureLoader();
const diffuseTexture = textureLoader.load('assets/diffuse.png');
const normalTexture = textureLoader.load('assets/normal.png');
const bumpTexture = textureLoader.load('assets/bump.png');
const aoTexture = textureLoader.load('assets/ambientOcclusion.png');
const specularTexture = textureLoader.load('assets/specular.png');

specularTexture.colorspace = THREE.NoColorSpace;

const material = new THREE.MeshPhysicalMaterial({ 
    // color: 0xff0000, 
    iridescence: 1,
    map: diffuseTexture,
    // normalMap: normalTexture,
    aoMap: aoTexture,
    bumpMap: bumpTexture,
    bumpScale: 2,
    roughnessMap: specularTexture,
    roughness: 1
})
const coolbox = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material)
scene.add( coolbox )

coolbox.position.z = -2

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); // Get time since last frame

    coolbox.rotation.x += 0.1 * delta
    coolbox.rotation.y += 0.07* delta
    coolbox.rotation.z += 0.1 * delta


    // composer.render(scene, activeCamera);

    renderer.render(scene, camera);
}
animate();
