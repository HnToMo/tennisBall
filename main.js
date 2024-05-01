import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1, 100
);
camera.position.set(0, -50, 50);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const helper = new THREE.AxesHelper(100);
scene.add(helper);

const loader = new GLTFLoader();
let model = null;
loader.load(
    "./tennis_ball.glb",
    function (gltf) {
        model = gltf.scene;
        model.scale.set(8, 8, 8);
        model.position.z = 8;
        // model.castShadow = true;
        // model.receiveShadow = true;
        model.traverse(function (child) {
            if (child.isMesh) {
                child.castShadow = true;
                // child.receiveShadow = true;
            }
        });
        scene.add(model);
    }
);

// const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
// const box = new THREE.Mesh(
//     boxGeometry,
//     new THREE.MeshStandardMaterial({color: 0x333333}),
// );
// box.position.set(0, 0, 5);
// box.rotation.set(0, 0, -30);
// box.castShadow = true;
// scene.add(box);

const planeGeometry = new THREE.PlaneGeometry(150, 150);
const plane = new THREE.Mesh(
    planeGeometry,
    new THREE.MeshStandardMaterial({color: 0xaaaaaa}),
);
plane.receiveShadow = true;
scene.add(plane);

const ambientLight = new THREE.AmbientLight(0xf5deb3, 0.5);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0xffffff, 1000, 100, Math.PI / 4, 1);
spotLight.position.set(10, -10, 20);
spotLight.castShadow = true;
scene.add(spotLight);

const clock = new THREE.Clock();
let elapsedTime;

animate();
onResize();
window.addEventListener("resize", onResize);

function animate() {
    requestAnimationFrame(animate);
    elapsedTime = clock.getElapsedTime();
    if (model !== null) {
        model.rotation.x = elapsedTime * 0.1
        model.rotation.z = elapsedTime * 0.1
    }
    controls.update();
    renderer.render(scene, camera);
}

function onResize() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}